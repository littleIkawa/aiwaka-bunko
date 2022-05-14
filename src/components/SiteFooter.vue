<template>
  <div>
    <footer>
      <p id="footer-copyright">
        Copyright &copy; <router-link to="/">Aiwaka</router-link> 2022
      </p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
footer {
  width: 100%;
  text-align: center;
  margin: 1.5rem 0;

  p {
    display: inline-block;
    font-size: 1.3rem;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 0.8rem 0.7rem rgba(0, 0, 0, 0.5);
    padding: 0.2rem 1rem;
  }
}
</style>
