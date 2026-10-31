(function () {
  const pagePrefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  const links = {
    catalog: `${pagePrefix}catalog.html`,
    contact: `${pagePrefix}contact.html`,
    headphones: `${pagePrefix}kulakliklar.html`,
    gaming: `${pagePrefix}oyun.html`,
    party: `${pagePrefix}parti.html`,
    warranty: `${pagePrefix}garanti.html`
  };

  const chatbotMarkup = `
    <button class="odak-chat-bubble" id="floatStartChatBtn" type="button" title="Canlı Destek Başlat">
      <span class="status-dot" aria-hidden="true"></span><span>ODAK Asistan</span>
    </button>
    <section id="liveChatModal" class="chat-modal-box" aria-label="ODAK canlı destek" aria-hidden="true">
      <div class="chat-header">
        <div class="chat-header-content">
          <span class="status-dot" aria-hidden="true"></span>
          <span>ODAK Destek Ekibi</span>
        </div>
        <button id="closeChatBtn" class="chat-close-button" type="button" aria-label="Sohbeti kapat">&times;</button>
      </div>
      <div id="chatMessages" class="chat-messages">
        <div class="msg-bot">Merhaba! ODAK Audio'ya hoş geldiniz. Size nasıl yardımcı olabilirim? Aşağıdan bir konu seçebilir veya sorunuzu yazabilirsiniz.</div>
        <div class="quick-replies" id="quickRepliesBox">
          <button class="quick-reply-btn" type="button" data-chat-text="Kulaklıklar">Kulaklıklar</button>
          <button class="quick-reply-btn" type="button" data-chat-text="Hoparlörler">Hoparlörler</button>
          <button class="quick-reply-btn" type="button" data-chat-text="Kargo ve Sipariş">Kargo ve Sipariş</button>
          <button class="quick-reply-btn" type="button" data-chat-text="İade ve Değişim">İade ve Değişim</button>
          <button class="quick-reply-btn" type="button" data-chat-text="Garanti Talebi">Garanti Talebi</button>
          <button class="quick-reply-btn" type="button" data-chat-text="Bize Ulaşın">Bize Ulaşın</button>
        </div>
        <div id="typingAnim" class="typing-indicator" aria-label="Yanıt hazırlanıyor"><span></span><span></span><span></span></div>
      </div>
      <form class="chat-composer" id="chatForm">
        <input class="chat-input" type="text" id="chatInput" placeholder="Mesajınızı yazın..." aria-label="Mesajınızı yazın" autocomplete="off">
        <button class="send-chat-button" id="sendChatBtn" type="submit" aria-label="Mesajı gönder" title="Mesajı gönder">
          <svg class="send-chat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M22 2 11 13" />
            <path d="m22 2-7 20-4-9-9-4Z" />
          </svg>
        </button>
      </form>
    </section>`;

  document.querySelectorAll('.floating-chat-bubble').forEach((bubble) => bubble.remove());
  document.body.insertAdjacentHTML('beforeend', chatbotMarkup);

  const startChatButtons = document.querySelectorAll('#startChatBtn, #floatStartChatBtn');
  const liveChatModal = document.getElementById('liveChatModal');
  const closeChatButton = document.getElementById('closeChatBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const typingIndicator = document.getElementById('typingAnim');
  const quickRepliesBox = document.getElementById('quickRepliesBox');

  function openChat(event) {
    if (event) event.preventDefault();
    liveChatModal.classList.add('is-open');
    liveChatModal.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => chatInput.focus(), 100);
  }

  function closeChat() {
    liveChatModal.classList.remove('is-open');
    liveChatModal.setAttribute('aria-hidden', 'true');
  }

  function appendMessage(text, sender) {
    const message = document.createElement('div');
    message.className = sender === 'user' ? 'msg-user' : 'msg-bot';
    message.innerHTML = text;
    chatMessages.insertBefore(message, typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage(text) {
    const messageText = (text || chatInput.value).trim();
    if (!messageText) return;

    appendMessage(messageText, 'user');
    chatInput.value = '';
    quickRepliesBox.style.display = 'none';
    typingIndicator.classList.add('is-visible');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    window.setTimeout(() => {
      typingIndicator.classList.remove('is-visible');
      appendMessage(getSmartBotReply(messageText.toLocaleLowerCase('tr-TR')), 'bot');
    }, 1500);
  }

  function getSmartBotReply(message) {
    const link = (href, label) => `<a href="${href}">${label}</a>`;

    if (message.includes('bozuldu') || message.includes('çalışmıyor') || message.includes('garanti') || message.includes('arızalı') || message.includes('tamir')) {
      return `Yaşadığınız teknik sorun için üzgünüz. Uzman ekibimizin ürünü incelemesi ve onarım/değişim sürecini başlatabilmemiz için lütfen garanti formumuzu doldurun. <br><br>${link(links.warranty, 'Garanti Talebi Oluştur')}`;
    }
    if (message.includes('kargo') || message.includes('teslimat') || message.includes('sipariş')) {
      return `Siparişleriniz genellikle 1-3 iş günü içerisinde kargoya teslim edilmektedir. Detaylı bilgi için bize ulaşabilirsiniz. <br><br>${link(links.contact, 'İletişim sayfasına geçin')}`;
    }
    return 'Size nasıl yardımcı olabilirim?';
  }

  startChatButtons.forEach((button) => button.addEventListener('click', openChat));
  closeChatButton.addEventListener('click', closeChat);
  chatForm.addEventListener('submit', (event) => { event.preventDefault(); sendMessage(); });
  document.querySelectorAll('[data-chat-text]').forEach((button) => button.addEventListener('click', () => sendMessage(button.dataset.chatText)));
})();
