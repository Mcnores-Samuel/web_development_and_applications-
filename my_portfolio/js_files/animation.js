const details = document.querySelector("button");
details.addEventListener('click', function(event){
    details.style.display = "none"
    var myInfo = ["Hello There 👋, I'm Mcnores Samuel Nkhoma.",
     "I'm a Self-taught web developer with a passion for creating innovative and engaging websites using HTML, CSS, and JavaScript.",
     "Proficient in front-end development and committed to delivering high-quality and visually appealing web experiences for users.",
     "Skills:",
     "⇒ Strong understanding of HTML, CSS, and JavaScript, with experience in creating dynamic and responsive websites.",
     "⇒ Experience in working with Git and other version control tools.",
     "⇒ Familiarity with cross-browser compatibility issues and solutions.",
     "⇒ Ability to design and implement visually appealing user interfaces, with a strong eye for design and attention to details.",
     "Education:",
     "⇒ Self-taught web developer, with a strong commitment to continuous learning and professional development.",
     "⇒ Completed various online courses and tutorials in HTML, CSS, and JavaScript, eg:",
     "↳ FreeCodeCamp.com.",
     "↳ W3Schools.com.",
     "↳ The Odin Project.com.",
     "↳ And currently learning software engineering at ALX Africa.",
     "Click on the projects to appreciate my work.",
     "Don't forget to contact me in the contacts section 😊.", 
     "Thank you for visiting my website. I hope you enjoy exploring my portfolio as much as I enjoyed creating it!. 🤝 "
    ];
    
    function typeWriter(text, character, fnCallback) {
      if (character < (text.length)) {
       document.querySelector(".writeInfo").innerHTML = text.substring(0, character+1) + '<span class="introInfo" aria-hidden="true"></span>';
        setTimeout(function() {
          typeWriter(text, character + 1, fnCallback)
        }, 100);
      }
      else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 2000);
      }
    }
     function StartTextAnimation(character) {
      if (character < myInfo[character].length) {
       typeWriter(myInfo[character], 0, function(){
         StartTextAnimation(character + 1);
       });
      }
    }
    StartTextAnimation(0);
  });