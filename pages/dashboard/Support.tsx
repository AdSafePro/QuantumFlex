
import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageSquare, Plus, Clock, CheckCircle } from 'lucide-react';
import { ChatMessage, SupportTicket } from '../../types';
import { APP_NAME } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';

const Support: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Load tickets from local storage for simulation between Admin/User
  useEffect(() => {
    const loadTickets = () => {
      const stored = localStorage.getItem('mock_tickets');
      if (stored) {
        // Filter out closed tickets older than 3 days
        const parsed = JSON.parse(stored) as SupportTicket[];
        const now = Date.now();
        const valid = parsed.filter(t => 
          t.status !== 'Closed' || (t.closedAt && now - t.closedAt < 3 * 24 * 60 * 60 * 1000)
        );
        // We only show tickets for "current user" (Simulated User ID 1)
        setTickets(valid.filter(t => t.userId === 1));
      }
    };
    
    loadTickets();
    // Poll for updates (Simulation of realtime)
    const interval = setInterval(loadTickets, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [tickets, activeTicketId]);

  const handleCreateTicket = () => {
    if (!newTicketSubject.trim()) return;

    const newTicket: SupportTicket = {
      id: `TICKET-${Date.now().toString().slice(-6)}`,
      userId: 1, // Mock User ID
      username: 'AlphaInvestor',
      subject: newTicketSubject,
      status: 'Active',
      messages: [{
        id: `msg-${Date.now()}`,
        sender: 'admin',
        text: `Hola, gracias por contactar a ${APP_NAME}. Un agente especializado se unirá al chat en breve.`,
        timestamp: Date.now()
      }],
      createdAt: Date.now(),
      lastUpdated: Date.now()
    };

    const stored = localStorage.getItem('mock_tickets');
    const allTickets = stored ? JSON.parse(stored) : [];
    const updatedTickets = [...allTickets, newTicket];
    
    localStorage.setItem('mock_tickets', JSON.stringify(updatedTickets));
    setTickets(prev => [...prev, newTicket]);
    setActiveTicketId(newTicket.id);
    setNewTicketSubject('');
    setIsCreating(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeTicketId) return;

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === activeTicketId) {
        return {
          ...ticket,
          messages: [
            ...ticket.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'user',
              text: newMessage,
              timestamp: Date.now()
            } as ChatMessage
          ],
          lastUpdated: Date.now()
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    
    // Update "DB"
    const stored = localStorage.getItem('mock_tickets');
    let allTickets: SupportTicket[] = stored ? JSON.parse(stored) : [];
    // Remove old version of this ticket and add new one (or update in place)
    allTickets = allTickets.filter(t => t.id !== activeTicketId);
    const activeTicket = updatedTickets.find(t => t.id === activeTicketId);
    if (activeTicket) allTickets.push(activeTicket);
    
    localStorage.setItem('mock_tickets', JSON.stringify(allTickets));
    setNewMessage('');
  };

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
      {/* Sidebar List */}
      <div className="w-full md:w-1/3 glass-panel rounded-xl flex flex-col border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
          <h2 className="font-bold text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-quantum-accent"/> {t('sup_my_tickets')}
          </h2>
          <button 
            onClick={() => setIsCreating(!isCreating)} 
            className="p-1.5 bg-quantum-accent/10 hover:bg-quantum-accent/20 rounded text-quantum-accent"
          >
            <Plus size={18} />
          </button>
        </div>

        {isCreating && (
          <div className="p-4 bg-quantum-accent/5 border-b border-quantum-accent/10 animate-fade-in-down">
            <input 
              type="text" 
              placeholder={t('sup_new_ph')}
              className="w-full bg-black/50 border border-gray-700 rounded p-2 text-sm text-white mb-2 outline-none focus:border-quantum-accent"
              value={newTicketSubject}
              onChange={(e) => setNewTicketSubject(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsCreating(false)} 
                className="text-xs text-gray-400 hover:text-white"
              >
                {t('sup_cancel')}
              </button>
              <button 
                onClick={handleCreateTicket} 
                className="text-xs bg-quantum-accent text-black font-bold px-3 py-1 rounded"
              >
                {t('sup_create')}
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {tickets.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              {t('sup_no_tickets')}
            </div>
          ) : (
            tickets.sort((a,b) => b.lastUpdated - a.lastUpdated).map(ticket => (
              <div 
                key={ticket.id}
                onClick={() => setActiveTicketId(ticket.id)}
                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors
                  ${activeTicketId === ticket.id ? 'bg-white/5 border-l-2 border-l-quantum-accent' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-white text-sm truncate pr-2">{ticket.subject}</h3>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold
                    ${ticket.status === 'Active' ? 'bg-green-500/20 text-green-500' : 
                      ticket.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                      'bg-gray-700 text-gray-400'}
                  `}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {ticket.messages[ticket.messages.length - 1]?.text}
                </p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-600">
                  <Clock size={10} />
                  {new Date(ticket.lastUpdated).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-panel rounded-xl border border-white/10 flex flex-col overflow-hidden relative">
        {!activeTicket ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <MessageSquare size={48} className="mb-4 opacity-20" />
            <p>Selecciona un ticket para ver la conversación</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white">{activeTicket.subject}</h3>
                <p className="text-xs text-gray-400">{t('sup_id')}: {activeTicket.id}</p>
              </div>
              {activeTicket.status === 'Closed' && (
                <div className="bg-red-500/10 text-red-500 px-3 py-1 rounded text-xs border border-red-500/20">
                  {t('sup_closed')}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
              {activeTicket.messages.map((msg, idx) => {
                const isMe = msg.sender === 'user';
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-xl p-3 text-sm
                      ${isMe 
                        ? 'bg-quantum-accent/20 text-white border border-quantum-accent/20 rounded-tr-none' 
                        : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-none'}
                    `}>
                      <p>{msg.text}</p>
                      <p className={`text-[9px] mt-1 text-right ${isMe ? 'text-quantum-accent/60' : 'text-gray-500'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {activeTicket.status !== 'Closed' && (
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/30 flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-quantum-accent"
                  placeholder={t('sup_msg_ph')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-quantum-accent text-black p-2 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Support;
