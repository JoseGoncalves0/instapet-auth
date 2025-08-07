import { useState, useEffect } from 'react'

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now()
    const newToast = { id, message, type, duration }
    
    setToasts(prev => [...prev, newToast])
    
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showSuccess = (message, duration) => addToast(message, 'success', duration)
  const showError = (message, duration) => addToast(message, 'error', duration)
  const showInfo = (message, duration) => addToast(message, 'info', duration)

  return {
    toasts,
    showSuccess,
    showError,
    showInfo,
    removeToast
  }
}

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
    // Animação de entrada
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  const getToastStyles = () => {
    const baseStyles = "px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform cursor-pointer"
    
    const typeStyles = {
      success: "bg-green-500",
      error: "bg-red-500", 
      info: "bg-blue-500"
    }

    const animationStyles = isVisible 
      ? "translate-x-0 opacity-100 scale-100" 
      : "translate-x-full opacity-0 scale-95"

    return `${baseStyles} ${typeStyles[toast.type]} ${animationStyles}`
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓'
      case 'error':
        return '✗'
      case 'info':
      default:
        return 'ℹ'
    }
  }

  return (
    <div 
      className={getToastStyles()}
      onClick={handleRemove}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{getIcon()}</span>
        <span>{toast.message}</span>
      </div>
    </div>
  )
}

export default ToastContainer

