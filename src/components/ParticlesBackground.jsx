// src/components/ParticlesBackground.js
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            animation: {
              enable: false,
              speed: 1,
            },
          },
          size: {
            value: 3,
            random: true,
            animation: {
              enable: false,
              speed: 40,
            },
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
          },
        },
        interactivity: {
          detectOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
