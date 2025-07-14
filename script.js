const materias = [
  // Semestre 1
  {codigo:"EGC", nombre:"Estudios generales Ciencias", requisitos: [], semestre:1},
  {codigo:"EGS", nombre:"Estudios generales Sociales", requisitos: [], semestre:1},
  {codigo:"ECF400", nombre:"Introducción a la Economía I", requisitos: [], semestre:1},
  {codigo:"LIX", nombre:"Inglés integrado I", requisitos: [], semestre:1},
  {codigo:"MAT001", nombre:"Matemática General", requisitos: [], semestre:1},
  
  // Semestre 2
  {codigo:"ECF", nombre:"Filosofía", requisitos: [], semestre:2},
  {codigo:"EGA", nombre:"Artes", requisitos: [], semestre:2},
  {codigo:"ECF402", nombre:"Intro a la Economía II", requisitos:["ECF400"], semestre:2},
  {codigo:"ECF403", nombre:"Estadística I", requisitos:["ECF400","MAT001"], semestre:2},
  {codigo:"MAT002", nombre:"Cálculo I", requisitos:["MAT001"], semestre:2},
  
  // Semestre 3
  {codigo:"ECF404", nombre:"Micro I", requisitos:["ECF400","MAT002"], semestre:3},
  {codigo:"ECF405", nombre:"Macro I", requisitos:["ECF402","MAT002"], semestre:3},
  {codigo:"ECF406", nombre:"Economía Política", requisitos:["ECF402","MAT001"], semestre:3},
  {codigo:"MAT050", nombre:"Cálculo II", requisitos:["MAT002"], semestre:3},
  {codigo:"ECF407", nombre:"Estadística II", requisitos:["ECF403","MAT002"], semestre:3},

  // Semestre 4
  {codigo:"ECF408", nombre:"Micro II", requisitos:["ECF404","MAT002"], semestre:4},
  {codigo:"ECF409", nombre:"Macro II", requisitos:["ECF405","MAT002"], semestre:4},
  {codigo:"ECF410", nombre:"Econ Política II", requisitos:["ECF406"], semestre:4},
  {codigo:"MAT005", nombre:"Álgebra Lineal", requisitos:["MAT002"], semestre:4},
  {codigo:"ECF411", nombre:"Econometría I", requisitos:["MAT050","ECF404","ECF405","ECF406","MAT005"], semestre:4},

  // Semestre 5
  {codigo:"ECF412", nombre:"Micro III", requisitos:["ECF408","MAT050"], semestre:5},
  {codigo:"ECF413", nombre:"Macro III", requisitos:["ECF409","MAT050"], semestre:5},
  {codigo:"ECF414", nombre:"Econ Política III", requisitos:["ECF410"], semestre:5},
  {codigo:"ECF415", nombre:"Econ Ambiental", requisitos:["ECF408","ECF411"], semestre:5},
  {codigo:"ECF416", nombre:"Econometría II", requisitos:["ECF408","ECF409","ECF411"], semestre:5},

  // Semestre 6
  {codigo:"ECF417", nombre:"Macro economías abiertas", requisitos:["ECF413","ECF416"], semestre:6},
  {codigo:"ECF423", nombre:"Comercio internacional", requisitos:["ECF412","ECF413","ECF416"], semestre:6},
  {codigo:"OPT1", nombre:"Optativa I", requisitos:[], semestre:6},
  {codigo:"ECF420", nombre:"Economía ecológica", requisitos:["ECF414","ECF415"], semestre:6},
  {codigo:"ECF421", nombre:"Econometría III", requisitos:["ECF416"], semestre:6},

  // Semestre 7
  {codigo:"ECF422", nombre:"Teorías del desarrollo", requisitos:[], semestre:7},
  {codigo:"ECF418", nombre:"Evaluación proyectos", requisitos:[], semestre:7},
  {codigo:"ECF424", nombre:"Economía pública", requisitos:[], semestre:7},
  {codigo:"ECF419", nombre:"Modelos multisectoriales", requisitos:["ECF423"], semestre:7},
  {codigo:"OPT2", nombre:"Optativa II", requisitos:[], semestre:7},

  // Semestre 8
  {codigo:"ECF425", nombre:"Temas desarrollo", requisitos:["ECF422"], semestre:8},
  {codigo:"ECF426", nombre:"Práctica profesional", requisitos:[], semestre:8},
  {codigo:"ECF4500", nombre:"Optativa III", requisitos:[], semestre:8},
  {codigo:"OPT3", nombre:"Optativa libre", requisitos:[], semestre:8},
  {codigo:"LIX2", nombre:"Inglés II", requisitos:["LIX"], semestre:8}
];

const aprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

function guardarProgreso() {
  localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
}

function puedeDesbloquear(materia) {
  return materia.requisitos.every(req => aprobadas.includes(req));
}

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let i = 1; i <= 8; i++) {
    const semestre = document.createElement("div");
    semestre.className = "semestre";
    semestre.innerHTML = `<h2>Semestre ${i}</h2>`;

    materias.filter(m => m.semestre === i).forEach(materia => {
      const btn = document.createElement("div");
      btn.className = "materia";

      const aprobada = aprobadas.includes(materia.codigo);
      const desbloqueada = puedeDesbloquear(materia);

      if (aprobada) {
        btn.classList.add("aprobada");
      } else if (desbloqueada) {
        btn.classList.add("activa");
        btn.addEventListener("click", () => aprobarMateria(materia.codigo));
      } else {
        btn.classList.add("bloqueada");
      }

      btn.textContent = `${materia.codigo} - ${materia.nombre}`;
      semestre.appendChild(btn);
    });

    contenedor.appendChild(semestre);
  }
}

function aprobarMateria(codigo) {
  if (!aprobadas.includes(codigo)) {
    aprobadas.push(codigo);
    guardarProgreso();
    crearMalla();
  }
}

crearMalla();
