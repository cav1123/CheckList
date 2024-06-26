<template>
  <div id="wrapper">
    <div id="container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0');

/* ルート設定 */
html {
  font-size: 62.5%;
  scrollbar-gutter: stable;
}

* {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 1.4rem;
  line-height: 1;
  box-sizing: border-box;
  color: var(--color-black);
  --color-white: #FFFFFF;
  --color-gray-l4: #F5F5F5;
  --color-gray-l2: #E0E0E0;
  --color-gray: #9E9E9E;
  --color-black: black;
  --color-deep-orange: #FF5722;
  --color-deep-orange-d2: #E64A19;
  --color-deep-orange-d4: #BF360C;
  --color-teal: #009688;
  --color-teal-d2: #00796B;
  --color-teal-d4: #004D40;
  --font-english: "roboto";
}

/* リセット */
ul {
  padding: 0;
  list-style: none;
}

button {
  background: none;
  border: none;
  padding: 0;
}

textarea,
input {
  border: none;
  padding: 0;
}

/* コンテナ・ラッパー */
#wrapper {
  background-color: var(--color-gray-l4);
  min-height: 100vh;
}

#container {
  width: 100%;
  max-width: 57.6rem;
  margin: auto;
  background-color: var(--color-white);
  min-height: 100vh;
}

/* レイアウト */
.flex-row {
  display: flex;
  align-items: center;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-center {
  display: flex;
  justify-content: center;
}

/* ナビゲーション */
.tabs {
  display: flex;
}

.tab {
  list-style: none;
  border-bottom: 1px solid var(--color-white);

  &.current {
    border-bottom: 1px solid var(--color-black);
  }

  & button {
    padding: 1.7rem 1.6rem;
    cursor: pointer;

    @media (hover:hover) {
      &:enabled:hover {
        background-color: var(--color-gray-l4);
      }
    }

    &:enabled:active {
      background-color: var(--color-gray-l2);
    }
  }
}

/* ボタン */
.icon-btn-primary {
  color: var(--color-white);
  background-color: var(--color-teal);
  cursor: pointer;

  @media (hover:hover) {
    &:enabled:hover {
      background-color: var(--color-teal-d2);
    }
  }

  &:enabled:active {
    background-color: var(--color-teal-d4);
  }
}

.icon-btn-secondary {
  color: var(--color-black);
  background-color: var(--color-white);
  cursor: pointer;

  @media (hover:hover) {
    &:enabled:hover {
      background-color: var(--color-gray-l4);
    }
  }

  &:enabled:active {
    background-color: var(--color-gray-l2);
  }

  &:disabled{
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.icon-btn-danger {
  color: var(--color-white);
  background-color: var(--color-deep-orange);
  cursor: pointer;

  @media (hover:hover) {
    &:enabled:hover {
      background-color: var(--color-deep-orange-d2);
    }
  }

  &:enabled:active {
    background-color: var(--color-deep-orange-d4);
  }
}

.icon-btn-lg {
  font-size: 2.4rem;
  padding: 1.2rem;
}

.icon-btn-lg-stretch {
  font-size: 2.4rem;
  width: 4.8rem;
  height: 100%;
}

.icon-btn-md {
  font-size: 2rem;
  padding: 0.6rem;
}

.icon-btn-sm {
  font-size: 1.6rem;
  padding: 0.4rem;
}

.icon-btn-br-infinity {
  border-radius: 50%;
}

.icon-btn-br-4,
.btn-br-4 {
  border-radius: 0.4rem;
}

.btn-primary {
  color: var(--color-white);
  background-color: var(--color-teal);
  border: 1px solid var(--color-teal);
  cursor: pointer;

  @media (hover:hover) {
    &:enabled:hover {
      background-color: var(--color-teal-d2);
      border: 1px solid var(--color-teal-d2);
    }
  }

  &:enabled:active {
    background-color: var(--color-teal-d4);
    border: 1px solid var(--color-teal-d4);
  }

  &:disabled{
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.btn-secondary {
  color: var(--color-black);
  background-color: var(--color-white);
  border: 1px solid var(--color-black);
  cursor: pointer;

  @media (hover:hover) {
    &:enabled:hover {
      background-color: var(--color-gray-l4);
    }
  }

  &:enabled:active {
    background-color: var(--color-gray-l2);
  }

  &:disabled{
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.btn-danger {
  color: var(--color-white);
  background-color: var(--color-deep-orange);
  border: 1px solid var(--color-deep-orange);
  cursor: pointer;

  @media (hover:hover) {
    &:enabled:hover {
      background-color: var(--color-deep-orange-d2);
      border: 1px solid var(--color-deep-orange-d2);
    }
  }

  &:enabled:active {
    background-color: var(--color-deep-orange-d4);
    border: 1px solid var(--color-deep-orange-d4);
  }
}

.btn-lg {
  font-size: 1.4rem;
  padding: 1.6rem;
  max-height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.btn-md {
  font-size: 1.4rem;
  padding: 0.8rem;
}

/* フォーム */
textarea {
  padding: 0.8rem;
  resize: none;
  line-height: 1.14;
  overflow: hidden;
  border-radius: 0.4rem;

  &::placeholder {
    color: var(--color-gray);
  }

  @media (hover:hover) {
    &:enabled:hover {
      background-color: var(--color-gray-l4);
    }
  }

  &:enabled:focus {
    background-color: var(--color-white);
    border: 1px solid var(--color-black);
  }
}

.checkbox {
  background-color: var(--color-white);
  min-width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  @media (hover:hover) {
    &:hover {
      background-color: var(--color-gray-l4);
    }
  }

  &:active {
    background-color: var(--color-gray-l2);
  }

  & input[type="checkbox"] {
    width: 1.6rem;
    height: 1.6rem;
    accent-color: var(--color-teal);
    position: relative;
    cursor: pointer;
    pointer-events: auto;
  }
}

input {
  border: 1px solid var(--color-gray-l2);
  border-radius: 0.4rem;
  padding: 1.6rem;
  max-height: 4.8rem;

  &::placeholder {
    color: var(--color-gray);
  }

  @media (hover:hover) {
    &:enabled:hover {
      background-color: var(--color-gray-l4);
    }
  }

  &:enabled:focus {
    background-color: var(--color-white);
    border: 1px solid var(--color-black);
  }
}
</style>
