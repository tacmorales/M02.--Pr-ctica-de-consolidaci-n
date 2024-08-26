//equivalente a $().ready de jquery

addEventListener("DOMContentLoaded", (event) => {
  // se crea una instancia de objeto kinet
  const kinet = new Kinet({
    acceleration: 0.06,
    friction: 0.25,
    names: ["x", "y"],
  });

  // selecciona el circulo
  const estrella = document.getElementById("estrella");

  // Fija el manejador del kinet sobre el evento tick y coloa el css para la fisica del estrella
  kinet.on("tick", function (instancias) {
    estrella.style.transform = `translate3d(${instancias.x.current}px, ${
      instancias.y.current
    }px, 0) rotateX(${instancias.x.velocity}deg) rotateY(${
      instancias.y.velocity / 2
    }deg)`;
  });

  // Tracking del mouse
  document.addEventListener("mousemove", function (event) {
    kinet.animate("x", event.clientX - window.innerWidth / 2);
    kinet.animate("y", event.clientY - window.innerHeight / 2);
  });

  /*
  En vez de seguir la posición del scroll con javascript, solo bastó con css: position: fixed. En el ejemplo que lo saqué usaba absolute. Funcióna pero solo si no hay scroll.
  var last_known_scroll_position = 0;
  var ticking = false;

  function doSomething(scroll_pos) {
    // Hacer algo con la posición del scroll
  }

  window.addEventListener("scroll", function (e) {
    ultima_posicion = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        fijarAnimacionPorsSeguimientoVertical(ultima_posicion);
        ticking = false;
      });
    }
    ticking = true;
  }); */

  // LOG
  /*     kinet.on("start", function () {
      console.log("start");
    });
  
    kinet.on("end", function () {
      console.log("end");
    }); */
});
