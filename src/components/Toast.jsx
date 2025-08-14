import { useState, useEffect } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

export const ToastContainer = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // animação de entrada
    setTimeout(() => setIsVisible(true), 10)

    // fecha automaticamente após a duração do toast (ou 2000ms por padrão)
    const duration = toast.duration ?? 2000
    const timer = setTimeout(() => {
      setIsVisible(false)
      // chama onRemove após animação de saída
      setTimeout(() => onRemove(toast.id), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [toast, onRemove])

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }

  const Icon = toast.type === 'success' ? CheckCircle : XCircle

  const animationStyles = isVisible
    ? 'translate-x-0 opacity-100 scale-100'
    : 'translate-x-full opacity-0 scale-95'

  return (
    <div
      className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform cursor-pointer ${typeStyles[toast.type || 'info']} ${animationStyles}`}
      onClick={() => {
        setIsVisible(false)
        setTimeout(() => onRemove(toast.id), 300)
      }}
    >
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <span>{toast.message}</span>
      </div>
    </div>
  )
}

export default ToastContainer