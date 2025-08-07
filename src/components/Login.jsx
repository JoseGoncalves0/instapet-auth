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
import { useToast, ToastContainer } from './Toast.jsx'
import { useTheme } from '../contexts/ThemeContext.jsx'
import '../App.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { toasts, showSuccess, showError, removeToast } = useToast()
  const { theme, toggleTheme, isDark } = useTheme()

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Verificar credenciais específicas
    if (email === 'zeca' && password === '123123') {
      // Login bem-sucedido
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', 'zeca')
      showSuccess('Login realizado com sucesso! Redirecionando...', 2000)
      
      // Redirecionar para a página principal após 2 segundos
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    } else {
      showError('Credenciais inválidas. Tente novamente.', 4000)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Background de acordo com o tema */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-75 transition-all duration-500"
        style={{
          backgroundImage: `url(${isDark ? '/TemaE.jpg' : '/TemaC.jpg'})`,
          zIndex: -1,
        }}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Botão de toggle do modo escuro */}
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

      {/* Cartão de login */}
      <Card className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-300 dark:border-gray-600 shadow-xl transition-all duration-300">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src={logoImage}
              alt="InstaPet Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bem-vindo ao InstaPet!
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Faça login para continuar
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-mail:
              </label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-200 dark:bg-gray-700 border-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Senha:
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-200 dark:bg-gray-700 border-0 pr-10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white"
            >
              Entrar
            </Button>
          </form>
          
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              Esqueceu sua senha?
            </Link>
          </div>
          
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
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                Cadastre-se
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

