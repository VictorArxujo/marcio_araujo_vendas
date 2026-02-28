/* Márcio da Silva Araújo — Consultor Toyota | Noma Motors Maringá | script.js */

// ── SCROLL ANIMATIONS ──
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.style.opacity='1'; e.target.style.transform='none'; }, e.target.dataset.delay||0);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.carro-card,.dif-card,.dep-card,.faq-item,.canal').forEach((el,i) => {
  el.style.opacity='0'; el.style.transform='translateY(18px)';
  el.style.transition='opacity 0.5s ease,transform 0.5s ease,box-shadow 0.25s,border-color 0.25s';
  el.dataset.delay=(i%4)*70; io.observe(el);
});

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});

// ── FORMULÁRIO ──
function enviarFormulario() {
  const nome      = document.getElementById('nome').value.trim();
  const telefone  = document.getElementById('telefone').value.trim();
  const modelo    = document.getElementById('modelo').value;
  const pagamento = document.getElementById('pagamento').value;
  const troca     = document.getElementById('troca').value;
  const mensagem  = document.getElementById('mensagem').value.trim();

  if (!nome || !telefone || !modelo) {
    alert('Por favor, preencha os campos obrigatórios: Nome, Telefone e Modelo de Interesse.');
    return;
  }

  document.getElementById('form-fields').style.display = 'none';
  document.getElementById('form-success').classList.add('show');

  // Monta mensagem WhatsApp com dados do formulário
  let msg = `Olá Márcio! Meu nome é ${nome}.\nTenho interesse no modelo: ${modelo}.\n`;
  if (pagamento) msg += `Forma de pagamento: ${pagamento}.\n`;
  if (troca)     msg += `Troca: ${troca}.\n`;
  msg += `Meu telefone: ${telefone}.`;
  if (mensagem)  msg += `\n\nObservações: ${mensagem}`;

  // Número do Márcio: (19) 98380-0561
  const numero = '5519983800561';
  setTimeout(() => {
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank');
  }, 1200);
}
window.enviarFormulario = enviarFormulario;

// ── MÁSCARA TELEFONE ──
const tel = document.getElementById('telefone');
if (tel) {
  tel.addEventListener('input', function() {
    let v = this.value.replace(/\D/g,'');
    if (v.length > 11) v = v.slice(0,11);
    if (v.length === 11) v = v.replace(/^(\d{2})(\d{5})(\d{4})$/,'($1) $2-$3');
    else if (v.length === 10) v = v.replace(/^(\d{2})(\d{4})(\d{4})$/,'($1) $2-$3');
    this.value = v;
  });
}
