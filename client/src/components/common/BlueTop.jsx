import React from "react";
import Particles from "react-particles-js";
export default function BlueTop({ text }) {
  return (
    <div id="blueTop">
      <h3>{text}</h3>
      <Particles
        params={{
          particles: {
            number: {
              value: 100
            },
            size: {
              value: 6
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: false
              }
            }
          },
          retina_detect: true
        }}
      />
    </div>
  );
}
