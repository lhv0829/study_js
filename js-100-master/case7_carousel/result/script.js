;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  class Carousel {
    constructor(carouselElement) {
      this.carouselElement = carouselElement
      this.itemClassName = 'carousel_item'
      this.items = this.carouselElement.querySelectorAll('.carousel_item')

      this.totalItems = this.items.length // 유사배열 객체로 가져와서 해당 객체의 length를 통해 개수 가져오기
      this.current = 0
      this.isMoving = false // true인 경우 버튼을 눌러도 이벤트가 동작하지 않게
    }

    initCarousel() {
      this.isMoving = false

      this.items[this.totalItems - 1].classList.add('prev')
      this.items[0].classList.add('active')
      this.items[1].classList.add('next')
    }

    setEventListeners() {
      this.prevButton = this.carouselElement.querySelector(
        '.carousel_button--prev'
      )
      this.nextButton = this.carouselElement.querySelector(
        '.carousel_button--next'
      )

      this.prevButton.addEventListener('click', () => {
        this.movePrev()
      })
      this.nextButton.addEventListener('click', () => {
        this.moveNext()
      })
    }

    disableInteraction() {
      this.isMoving = true
      setTimeout(() => {
        this.isMoving = false
      }, 500)
    }

    moveCarouselTo() {
      if (!this.isMoving) { // if(this.isMoving) return; else { 코드 } 랑 같은 경우
        this.disableInteraction()

        let prev = this.current - 1
        let next = this.current + 1

        if (this.current === 0) {
          prev = this.totalItems - 1
        } else if (this.current === this.totalItems - 1) {
          next = 0
        }

        for (let i = 0; i < this.totalItems; i++) {
          if (i == this.current) {
            this.items[i].className = this.itemClassName + ' active'
          } else if (i == prev) {
            this.items[i].className = this.itemClassName + ' prev'
          } else if (i == next) {
            this.items[i].className = this.itemClassName + ' next'
          } else {
            this.items[i].className = this.itemClassName
          }
        }
      }
    }

    moveNext() {
      if (!this.isMoving) {
        if (this.current === this.totalItems - 1) {
          this.current = 0
        } else {
          this.current++
        }

        this.moveCarouselTo()
      }
    }

    movePrev() {
      if (!this.isMoving) {
        if (this.current === 0) {
          this.current = this.totalItems - 1
        } else {
          this.current--
        }

        this.moveCarouselTo()
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = get('.carousel')

    const carousel = new Carousel(carouselElement)
    carousel.initCarousel()
    carousel.setEventListeners()
  })
})()
