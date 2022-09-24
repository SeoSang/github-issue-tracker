<script>

</script>

<main>
    <div class="titleContainer">
        <h1>Github-Issue-Tracker 🚀</h1>
    </div>
    <ul>
        <li>
            <a href="https://github.com/SeoSang/github-issue-tracker" target="_blank">How to? 🧐</a>
        </li>
        <li>
            <a href="https://github.com/SeoSang/github-issue-tracker/pulls" target="_blank">Contribute ✏️</a>
        </li>
        <li>
            <a href="https://github.com/SeoSang/github-issue-tracker/issues" target="_blank">Report Bug 🐞</a>
        </li>
    </ul>
    <footer>v1.1.0</footer>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 260px;
    font-family: Apercu, system-ui;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    padding: 1.3rem;
    border-radius: 1rem;
    height: 100%;
  }

  ul {
    list-style: none;
  }

  ul li:before {
    content: "👉";
    display: inline-block;
    vertical-align: middle;
    padding: 0px 5px 6px 0px;
  }


  li {
    font-size: 15px;
    margin-bottom: 8px;

  }

  a {
    border-radius: 3px;
    text-decoration: none;
    color: #212121;
    font-weight: bold;
    padding: 5px 10px;

    &:hover {
      background: #cbffb8;
    }
  }

  .titleContainer {
    display: flex;
  }

  footer {
    text-align: right;
    color: #575756;
  }
</style>
