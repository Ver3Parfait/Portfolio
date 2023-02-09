function start() {
    if (window.scrollY == 2330) {
        window.scrollTo({
            top:0,
            behavior: 'smooth'
          });
    }else{
        window.scrollTo({
            top:2330,
            left:1000,
            behavior: 'smooth'
          });
    }
}