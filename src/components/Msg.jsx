import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, MoreHorizontal, Video, Edit, Send, Smile } from 'lucide-react'
import logoImage from '../assets/logo.png'
import { useTheme } from '../contexts/ThemeContext.jsx'

export default function Msg() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Olá! Como você está?' },
    { id: 2, sender: 'me', text: 'Estou bem, obrigado! E você?' },
    { id: 3, sender: 'other', text: 'Tudo ótimo por aqui! Vi suas fotos, muito legais!' },
    { id: 4, sender: 'me', text: 'Que bom que gostou! Qual sua favorita?' },
    { id: 5, sender: 'other', text: 'A do cachorro brincando na praia, ele é muito fofo!' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, sender: 'me', text: newMessage.trim() }])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-10 transition-colors duration-300">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <span className="text-xl font-bold">perfil_test</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Video className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Edit className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-6xl mx-auto w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 sticky bottom-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="flex items-center space-x-3 max-w-6xl mx-auto">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Smile className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
          <input
            type="text"
            placeholder="Mensagem..."
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSendMessage} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Send className="w-6 h-6 text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  )
}