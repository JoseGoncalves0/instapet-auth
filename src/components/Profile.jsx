import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Search, User, Home as HomeIcon, Moon, Sun, Camera, Edit3 } from 'lucide-react'
import logoImage from '../assets/logo.png'
import { useTheme } from '../contexts/ThemeContext.jsx'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { toggleTheme, isDark } = useTheme()
  const modalFileInputRef = useRef(null)

  // Estado do usuário (editável)
  const [user, setUser] = useState({
    avatar: '', // dataURL ou vazio -> sem foto
    avatarEmoji: '👤',
    name: 'zeca',
    fullName: 'AAAAAAAAAAAAAAAA',
    bio: '',
    website: 'github.com/JoseGoncalves0',
    posts: 0,
    followers: '69k',
    following: 67,
  })

  // Modal de edição
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [draft, setDraft] = useState(user)

  // Preview temporário para o modal
  const [modalImagePreview, setModalImagePreview] = useState('')

  // Funções para modal de edição
  function openEdit() {
    setDraft(user)
    setModalImagePreview(user.avatar || '')
    setIsEditOpen(true)
  }

  function closeEdit() {
    setIsEditOpen(false)
  }

  function handleModalImageChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setModalImagePreview(ev.target.result)
        setDraft((d) => ({ ...d, avatar: ev.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  function saveProfile() {
    setUser(draft)
    setIsEditOpen(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header - igual ao Home */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-10 transition-colors duration-300">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <img src={logoImage} alt="InstaPet" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">InstaPet</span>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/home')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Home"
            >
              <HomeIcon className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative" title="Mensagens">
              <MessageCircle className="w-6 h-6 text-gray-900 dark:text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
            </button>

            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" title="Favoritos">
              <Heart className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" title="Tema">
              {isDark ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
            </button>

            <button onClick={() => navigate('/profile')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" title="Perfil">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo do Perfil */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex gap-12 items-center mb-8">
          {/* Foto de Perfil (sem botão de mudar foto direto) */}
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-36 h-36 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-36 h-36 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl">
                {user.avatarEmoji}
              </div>
            )}

            {/* NOTE: botão de mudar foto removido daqui. Agora a foto só muda via modal (3 pontinhos) */}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-2xl font-semibold">{user.name}</h1>

              {/* Removido: botão "Seguindo" e "Enviar mensagem" (porque é o próprio perfil) */}

              {/* 3 pontinhos: abre modal de editar */}
              <button onClick={openEdit} className="px-2 py-1 border rounded-md text-sm">···</button>
            </div>

            <div className="flex gap-6 mb-3 text-sm">
              <div>
                <span className="font-semibold">{user.posts}</span> publicações
              </div>
              <div>
                <span className="font-semibold">{user.followers}</span> seguidores
              </div>
              <div>
                <span className="font-semibold">{user.following}</span> seguindo
              </div>
            </div>

            <div className="text-sm">
              <div className="font-medium">{user.fullName}</div>
              <div className="whitespace-pre-line">{user.bio || <span className="text-gray-500">Adicione uma bio</span>}</div>
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="text-blue-600 text-sm block mt-1">
                {user.website}
              </a>
            </div>
          </div>
        </div>

        {/* Área de Posts (vazia) */}
        <div className="mt-8 flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-light text-gray-900 dark:text-white mb-2">Nenhuma publicação ainda</h3>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Quando você compartilhar fotos e vídeos, eles aparecerão no seu perfil.
          </p>
        </div>
      </div>

      {/* Modal de edição de perfil */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeEdit} />

          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Editar perfil</h2>
              <button onClick={closeEdit} className="text-gray-500 hover:text-gray-700">Fechar</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center md:items-start md:col-span-1">
                {modalImagePreview ? (
                  <img src={modalImagePreview} alt="preview" className="w-32 h-32 rounded-full object-cover border" />
                ) : (
                  <div className="w-32 h-32 rounded-full border bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-4xl">{user.avatarEmoji}</div>
                )}

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => modalFileInputRef.current?.click()}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                  >
                    Alterar foto
                  </button>
                  <button
                    onClick={() => { setModalImagePreview(''); setDraft((d) => ({ ...d, avatar: '' })); }}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    Remover
                  </button>
                </div>

                <input ref={modalFileInputRef} type="file" accept="image/*" onChange={handleModalImageChange} className="hidden" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Nome de usuário</label>
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  className="w-full mb-3 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <label className="block text-sm mb-1">Nome completo</label>
                <input
                  type="text"
                  value={draft.fullName}
                  onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
                  className="w-full mb-3 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <label className="block text-sm mb-1">Bio</label>
                <textarea
                  value={draft.bio}
                  onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                  className="w-full mb-3 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />

                <label className="block text-sm mb-1">Website</label>
                <input
                  type="text"
                  value={draft.website}
                  onChange={(e) => setDraft((d) => ({ ...d, website: e.target.value }))}
                  className="w-full mb-3 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <div className="flex gap-2 justify-end">
                  <button onClick={closeEdit} className="px-4 py-2 border rounded-md">Cancelar</button>
                  <button onClick={saveProfile} className="px-4 py-2 bg-blue-600 text-white rounded-md">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}