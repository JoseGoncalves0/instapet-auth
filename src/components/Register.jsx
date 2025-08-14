import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import { Eye, EyeOff, Moon, Sun } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import logoImage from '../assets/logo.png'
import googleLogo from '../assets/google_logo.png'
import appleLogo from '../assets/apple_logo.png'
import microsoftLogo from '../assets/microsoft_logo.webp'
import { useTheme } from '../contexts/ThemeContext.jsx'
import '../App.css'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    emailOrPhone: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  // Removido: const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { toggleTheme, isDark } = useTheme()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')

    if (!agreeToTerms) {
      setError('Você deve aceitar os termos da Política de Privacidade')
      return
    }

    if (!formData.fullName || !formData.username || !formData.emailOrPhone || !formData.password) {
      setError('Todos os campos são obrigatórios')
      return
    }

    // Simular registro bem-sucedido
    alert('Cadastro realizado com sucesso! Agora você pode fazer login.')
    navigate('/login')
  }

  // Adicione estes estados extras para compatibilidade com o outro código
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // Adicione esta função para alternar a visualização da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Imagem de fundo com tema */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-75 transition-all duration-500"
        style={{
          backgroundImage: `url(${isDark ? '/TemaE.jpg' : '/TemaC.jpg'})`,
          zIndex: -1,
        }}
      />

      {/* Botão de alternar tema */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <Card className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-300 dark:border-gray-600 shadow-xl transition-all duration-300">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src={logoImage}
              alt="InstaPet Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">InstaPet</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Crie sua conta gratuitamente
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome completo*
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-gray-200 dark:bg-gray-700 border-0 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome de usuário*
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-gray-200 dark:bg-gray-700 border-0 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-mail ou Telefone*
              </label>
              <Input
                id="emailOrPhone"
                name="emailOrPhone"
                type="text"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                className="w-full bg-gray-200 dark:bg-gray-700 border-0 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Senha*
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 dark:bg-gray-700 border-0 pr-10 text-gray-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white"
            >
              Cadastrar
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Entrar com</p>
            <div className="flex justify-center space-x-4">
              <button className="w-10 h-10 rounded flex items-center justify-center p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <img src={googleLogo} alt="Google Logo" className="w-full h-full object-contain" />
              </button>
              <button className="w-10 h-10 rounded flex items-center justify-center p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <img src={appleLogo} alt="Apple Logo" className="w-full h-full object-contain" />
              </button>
              <button className="w-10 h-10 rounded flex items-center justify-center p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <img src={microsoftLogo} alt="Microsoft Logo" className="w-full h-full object-contain" />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1"
              />
              <span>
                Ao me cadastrar, confirmo que li e aceito os termos da{' '}
                <Link to="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                  Política de Privacidade
                </Link>.
              </span>
            </label>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                Entrar
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
