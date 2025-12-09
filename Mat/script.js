let display;

window.addEventListener('DOMContentLoaded', () => {
  // ===== Navegação =====
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.target;
      const section = document.getElementById(target);
      if (section) section.classList.add('active');

      if (target === 'quiz') startQuiz();
    });
  });

  document.querySelector('.nav-btn.active')?.click();

  // ===== Calculadora =====
  display = document.getElementById("display");

  // ===== Exercícios =====
  const exercicios = [
    {id: '1', resposta: 42},
    {id: '2', resposta: 36},
    {id: '3', resposta: 42},
    {id: '4', resposta: 9}
  ];

  document.querySelectorAll('.exercise').forEach(div => {
    const btn = div.querySelector('.check-btn');
    const input = div.querySelector('input');
    const feedback = div.querySelector('.feedback');
    const exId = div.dataset.exercise;
    const correto = exercicios.find(e => e.id === exId)?.resposta;

    btn.addEventListener('click', () => {
      const valor = parseInt(input.value);
      if (isNaN(valor)) {
        feedback.textContent = "Por favor, digite um número válido.";
        feedback.style.color = '#d9534f';
        return;
      }
      if (valor === correto) {
        feedback.textContent = "Correto! 🎉";
        feedback.style.color = '#1a8917';
      } else {
        feedback.textContent = `Incorreto. Tente novamente!`;
        feedback.style.color = '#d9534f';
      }
    });
  });

  // ===== Quiz com input =====
  const perguntas = [
    {pergunta: "Qual é o resultado de 12 + 7 × 3?", resposta: "33"},
    {pergunta: "Qual é o único número par que é primo?", resposta: "2"},
    {pergunta: "Quanto é 144 ÷ 12?", resposta: "12"},
    {pergunta: "Qual é o nome dado ao conjunto dos números naturais?", resposta: "0,1,2,3,4,5,..."},
    {pergunta: "O que representa o número π?", resposta: "3.14159"}
  ];

  const perguntaEl = document.getElementById('pergunta');
  const respostaInput = document.getElementById('respostaInput');
  const btnVerificar = document.getElementById('btnVerificar');
  const btnNovo = document.getElementById('btnNovo');
  const feedback = document.getElementById('feedback');

  let indiceAtual = 0;

  function startQuiz() {
    indiceAtual = 0;
    respostaInput.style.display = "inline-block";
    btnVerificar.style.display = "inline-block";
    mostrarPergunta();
  }

  function mostrarPergunta() {
    perguntaEl.textContent = perguntas[indiceAtual].pergunta;
    respostaInput.value = "";
    feedback.textContent = "";
    btnVerificar.disabled = false;
    btnNovo.disabled = true;
  }

  btnVerificar.addEventListener('click', () => {
    const respostaUsuario = respostaInput.value.trim();
    const respostaCorreta = perguntas[indiceAtual].resposta.trim();

    if (respostaUsuario === "") {
      feedback.textContent = "Por favor, digite uma resposta!";
      feedback.style.color = "#d9534f";
      return;
    }

    if (respostaUsuario.toLowerCase() === respostaCorreta.toLowerCase()) {
      feedback.textContent = "Correto! 🎉";
      feedback.style.color = "#1a8917";
    } else {
      feedback.textContent = `Incorreto. A resposta correta é: ${respostaCorreta}`;
      feedback.style.color = "#d9534f";
    }

    btnVerificar.disabled = true;
    btnNovo.disabled = false;
  });

  btnNovo.addEventListener('click', () => {
    indiceAtual++;
    if (indiceAtual >= perguntas.length) {
      perguntaEl.textContent = "Parabéns! Você concluiu o quiz.";
      respostaInput.style.display = "none";
      btnVerificar.style.display = "none";
      feedback.textContent = "";
      btnNovo.disabled = true;
    } else {
      respostaInput.style.display = "inline-block";
      btnVerificar.style.display = "inline-block";
      mostrarPergunta();
    }
  });
});

// ===== Funções da Calculadora =====
function inserir(valor) {
  if (!display) return;
  if (display.value === "Erro") display.value = "";
  display.value += valor;
}

function limparDisplay() {
  if (!display) return;
  display.value = "";
}

function apagarUltimo() {
  if (!display) return;
  if (display.value === "Erro") display.value = "";
  display.value = display.value.slice(0, -1);
}

function calcular() {
  if (!display) return;
  try {
    if (display.value.trim() === "") return;
    let valor = display.value.replace(/×/g,'*').replace(/÷/g,'/');
    let resultado = eval(valor);
    if (!isFinite(resultado)) throw "Erro";
    display.value = resultado;
  } catch (e) {
    display.value = "Erro";
  }
}
