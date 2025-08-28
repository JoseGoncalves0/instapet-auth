import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Search, PlusSquare, Film, User, Home as HomeIcon, Moon, Sun, Flag, EyeOff } from 'lucide-react';
import logoImage from '../assets/logo.png';
import { useTheme } from '../contexts/ThemeContext.jsx';

export default function Home() {
  const [unreadMessages, setUnreadMessages] = useState(1);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const initialPosts = useMemo(() => [
    {
      id: 1,
      username: 'perfil_test',
      avatar: '👤',
      image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop',
      likes: 42,
      caption: 'test testetets',
      timeAgo: '2h'
    },
    {
      id: 2,
      username: 'perfil_test2',
      avatar: '🐕',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
      likes: 128,
      caption: 'Meu melhor amigo sempre ao mtestetstetstet',
      timeAgo: '4h'
    },
    {
      id: 3,
      username: 'perfil_test3',
      avatar: '🐱',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
      likes: 89,
      caption: 'etstetstes teste',
      timeAgo: '6h'
    },
    {
      id: 4,
      username: 'perfil_test4',
      avatar: '🦮',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
      likes: 203,
      caption: 'tstestetstetstet etsteste',
      timeAgo: '8h'
    },
    {
      id: 5,
      username: 'perfil_test5',
      avatar: '🐰',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop',
      likes: 156,
      caption: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      timeAgo: '10h'
    }
  ], []);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const loadMorePosts = useCallback(() => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      const newPosts = [
        {
          id: posts.length + 1,
          username: `user_${posts.length + 1}`,
          avatar: '🐾',
          // Gera uma imagem aleatória usando o serviço lorem picsum ou Unsplash com seed
          image: `https://picsum.photos/400/400?random=${posts.length + 1}`,
          // Ou: `https://source.unsplash.com/random/400x400?sig=${posts.length + 1}`,
          likes: Math.floor(Math.random() * 200) + 10,
          caption: 'HAHAHAHAHAHHAHA',
          timeAgo: `${Math.floor(Math.random() * 12) + 1}h`
        },
        {
          id: posts.length + 2,
          username: `teste_user${posts.length + 2}`,
          avatar: '🐈',
          // Gera outra imagem aleatória
          image: `https://picsum.photos/400/400?random=${posts.length + 2}`,
          // Ou: `https://source.unsplash.com/random/400x400?sig=${posts.length + 2}`,
          likes: Math.floor(Math.random() * 150) + 5,
          caption: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATETS',
          timeAgo: `${Math.floor(Math.random() * 24) + 1}h`
        }
      ];

      setPosts(prev => [...prev, ...newPosts]);
      setLoading(false);
    }, 1000);
  }, [loading, posts.length]);

  useEffect(() => {
    const handleScroll = () => {
      // Verifica se o usuário chegou ao final da página e não está carregando
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMorePosts]); // Dependências corrigidas para evitar renderizações desnecessárias

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(postId)) {
        newLikes.delete(postId);
      } else {
        newLikes.add(postId);
      }
      return newLikes;
    });
  };

  const removePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    setOpenMenuId(null);
  };

  const toggleMenu = (postId) => {
    setOpenMenuId(openMenuId === postId ? null : postId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se o clique foi fora de qualquer elemento com a classe 'post-menu-container'
      if (openMenuId && !event.target.closest('.post-menu-container')) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  const stories = useMemo(() => [
    { id: 1, username: 'eu', avatar: '👤' },
    { id: 2, username: 'amigo 1', avatar: '👤' },
    { id: 3, username: 'amigo 2', avatar: '👤' },
    { id: 4, username: 'amigo 3', avatar: '👤' },
    { id: 5, username: 'amigo 4', avatar: '👤' }
  ], []);

  const suggestions = useMemo(() => [
    { id: 1, username: 'sugestao_1', name: 'Sugestão 1', avatar: '👤' },
    { id: 2, username: 'sugestao_2', name: 'Sugestão 2', avatar: '👤' },
    { id: 3, username: 'sugestao_3', name: 'Sugestão 3', avatar: '👤' },
    { id: 4, username: 'sugestao_4', name: 'Sugestão 4', avatar: '👤' },
    { id: 5, username: 'sugestao_5', name: 'Sugestão 5', avatar: '👤' }
  ], []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-10 transition-colors duration-300">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logoImage} alt="InstaPet" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">InstaPet</span>
          </div>

          {/* Barra de Pesquisa */}
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

          {/* Ícones de Navegação */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/home')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Home"
            >
              <HomeIcon className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            {/* Botão de Mensagens com contador dinâmico */}
            <button
              onClick={() => navigate("/messages")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
              aria-label="Mensagens"
            >
              <MessageCircle className="w-6 h-6 text-gray-900 dark:text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadMessages}
              </span>
            </button>

            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Curtidas"
            >
              <Heart className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Alternar tema"
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Perfil"
            >
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </div>
            </button>
          </div>
        </div>
      </header>


      <div className="max-w-6xl mx-auto flex">
        {/* Feed Principal */}
        <div className="flex-1 max-w-2xl mx-auto">
          {/* Stories */}
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-6">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide"> {/* Adicione scrollbar-hide se tiver TailwindCSS Custom Forms */}
              {stories.map((story) => (
                <div key={story.id} className="flex flex-col items-center space-y-1 min-w-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span role="img" aria-label="Avatar da história" className="text-2xl">{story.avatar}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 truncate w-16 text-center">
                    {story.username}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Feed de Posts */}
          <div>
            {posts.map((post) => (
              <div key={post.id} className="border-b border-gray-200 dark:border-gray-700 mb-6">
                {/* Post Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span role="img" aria-label="Avatar do post">{post.avatar}</span>
                    </div>
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">{post.username}</span>
                  </div>

                  {/* Menu de Ações */}
                  <div className="relative post-menu-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(post.id);
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                      aria-label="Mais opções do post"
                    >
                      <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === post.id && (
                      <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 w-48 z-20">
                        <button
                          onClick={() => removePost(post.id)} // Mantive removePost, mas para denunciar seria outra função
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <Flag className="w-4 h-4" />
                          <span>Denunciar</span>
                        </button>
                        <button
                          onClick={() => removePost(post.id)} // Mantive removePost para "Não recomendar" também
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <EyeOff className="w-4 h-4" />
                          <span>Não recomendar</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Image */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => toggleLike(post.id)} aria-label="Curtir post">
                        <Heart
                          className={`w-6 h-6 ${likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : 'text-gray-900 dark:text-white'}`}
                        />
                      </button>
                      <button aria-label="Comentar no post">
                        <MessageCircle className="w-6 h-6 text-gray-900 dark:text-white" />
                      </button>
                      <button aria-label="Enviar post">
                        <Send className="w-6 h-6 text-gray-900 dark:text-white" />
                      </button>
                    </div>
                    <button aria-label="Salvar post">
                      <Bookmark className="w-6 h-6 text-gray-900 dark:text-white" />
                    </button>
                  </div>

                  {/* Likes */}
                  <div className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)} curtidas
                  </div>

                  {/* Caption */}
                  <div className="text-sm text-gray-900 dark:text-white">
                    <span className="font-semibold">{post.username}</span>{' '}
                    <span>{post.caption}</span>
                  </div>

                  {/* Comments */}
                  <div className="mt-2">
                    <div className="flex items-start space-x-2 text-sm">
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <span role="img" aria-label="Avatar do comentarista" className="text-xs">👤</span>
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        <span className="font-semibold">User1234_test</span>{' '}
                        <span>comentou no seu post:</span>{' '}
                        <span>{post.caption}</span>
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {post.timeAgo}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>

        {/* Barra Lateral de Sugestões */}
        <div className="w-80 p-4 hidden lg:block">
          <div className="sticky top-20">
            {/* Perfil do Usuário */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">zeca</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Zeca</div>
              </div>
            </div>

            {/* Sugestões */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Sugestões para você</span>
                <button className="text-xs text-blue-500 dark:text-blue-400 font-semibold">Ver tudo</button>
              </div>

              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span role="img" aria-label="Avatar da sugestão" className="text-sm">{suggestion.avatar}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{suggestion.username}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{suggestion.name}</div>
                      </div>
                    </div>
                    <button className="text-xs text-blue-500 dark:text-blue-400 font-semibold">Seguir</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-xs text-gray-400 dark:text-gray-500 space-y-1">
              <div>Sobre • Ajuda • Imprensa • API • Carreiras • Privacidade •</div>
              <div>Termos • Localizações • Principais contas • Hashtags • Idioma</div>
              <div className="mt-4">© 2024 INSTAPET DO FACEBOOK</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}