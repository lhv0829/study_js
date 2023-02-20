;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  let currentPage = 1
  let total = 10
  const limit = 10 // 포스트 개수 제한
  const end = 100

  const $posts = get('.posts')
  const $loader = get('.loader')

  const hideLoader = () => {
    $loader.classList.remove('show')
  }

  const showLoader = () => {
    $loader.classList.add('show')
  }

  const showPosts = (posts) => { // 포스트를 처리해서 보여주는 함수
    posts.forEach((post) => { // 포스트를 하나하나 다 처리하기 위해 forEach 사용
      const $post = document.createElement('div') // 포스트 클래스를 가진 div 생성
      $post.classList.add('post') // 클래스 추가
      $post.innerHTML = `
          <div class="header">
            <div class="id">${post.id}.</div>
            <div class="title">${post.title}</div>
          </div>
          <div class="body">${post.body}</div>
      `
      $posts.appendChild($post)
    })
  }

  const getPosts = async (page, limit) => { // fetch API 사용
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('에러가 발생했습니다.')
    }
    return await response.json()
  }

  const loadPosts = async (page, limit) => { 
    showLoader() // 로더 노출. 로딩을 할 때마다 로딩 요소의 opcity를 1로 변경
    try {
      const response = await getPosts(page, limit) // return한 response 받아오기
      showPosts(response)
    } catch (error) {
      console.error(error.message)
    } finally {
      hideLoader() //  로더 숨기기
    }
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    if (total === end) { // total과 end가 같아지면 더이상 실행이 되지 않도록 return
      window.removeEventListener('scroll', handleScroll) // 스크롤이 끝났으면 더 이상 스크롤 이벤트가 필요없기 때문에 제거
      return
    }

    if (scrollTop + clientHeight >= scrollHeight - 5) { // 스크롤 영역과 보여지는 영역을 더한 값이 전체 컨텐츠 길이보다 크거나 같으면 데이터를 불러오기. 5px을 빼는 이유는 간격을 주기 위해서
      currentPage++
      total += 10
      loadPosts(currentPage, limit)
      return
    }
  }

  window.addEventListener('DOMContentLoaded', () => { // DOMContentLoaded 이벤트가 발생할 때 실행
    loadPosts(currentPage, limit) // DOM이 다 불러와졌을 경우 loadPosts함수 실행(포스트를 불러오는 함수)
    window.addEventListener('scroll', handleScroll)
  })
})()
