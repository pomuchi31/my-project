let calendar;
let selectedDate = null;
document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'local',
    timeZone: 'local',
    eventDisplay: 'block',
    displayEventTime: false,
    selectable: true,
    events: {
      url: '/workschedule/schedule_data/'
       
    },
    select: arg => {
      selectedDate = arg.startStr;  // クリックした日付を変数に保存
      console.log("Calendar selected", arg);
      initEditModal(arg);
    },
    eventClick: arg => {
      console.log("Event clicked", arg);
      initEditModal(arg);
    },
  });

  calendar.render();

  const initEditModal = data => {
    removeAlreadyModal();
    const defModal = document.getElementById('exampleModal');
    defModal.classList.add('modal-centered');
    const bootstrapModal = new bootstrap.Modal(defModal);
    bootstrapModal.show();
    document.body.appendChild(defModal);
    if (data.event === undefined) {
      const deleteElem = document.querySelector('#defModal .delete');
      if (deleteElem) {
        deleteElem.remove();
      }
    }
    setupModalData(defModal, data);
    registerEditModalEvent(defModal, data);
  };

  const setupModalPosition = (modal, e) => {
    const position = calcModalPosition(e);
    modal.style.left = `${position.x}px`;
    modal.style.top = `${position.y}px`;
  };

  const calcModalPosition = e => {
    const windowWidth = window.outerWidth;

    const y = e.pageY + 16;
    let x = e.pageX;

    if (e.pageX <= 125) {
      x = e.pageX;
    } else if (e.pageX > 125 && windowWidth - e.pageX > 125) {
      x = e.pageX - 125;
    } else if (windowWidth - e.pageX <= 125) {
      x = e.pageX - 250;
    }

    return {
      x: x,
      y: y
    };
  };

  const removeAlreadyModal = () => {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.remove();
    }
  };

  // モーダル登録処理
  const registerEditModalEvent = (modal, arg) => {

    // 保存
    const saveButton = modal.querySelector('#save');
    if (saveButton) {
      saveButton.addEventListener('click', e => {
        e.preventDefault();
        console.log('Save button clicked');

        const start = modal.querySelector('#start').value;
        const end = modal.querySelector('#end').value;
        const title = modal.querySelector('#title').value;
        const color = modal.querySelector('#color').value;

        const data = {
          start: start,
          end: end,
          title: title,
          color: color
        };

        fetch('/surveyCalendar_view/', {
          method: 'POST',
          body: new FormData(document.querySelector('form')),
          headers: {
            'X-CSRFToken': csrfToken
          }
        }).then, response => {
          if (response.ok) {
            // 保存が成功した場合の処理
            const successMessage = document.getElementById('Save');
            const errorMessage = document.getElementById('Error');
            fetch('/surveyCalendar_view/', {
              method: 'POST',
              body: new FormData(),
              headers: {
                const: csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value,
              }
            })
              .then(response => {
                if (response.ok) {
                  // 保存が成功した場合の処理
                  successMessage.style.display = 'block';
                  // エラーメッセージを非表示にする
                  errorMessage.style.display = 'none';
                } else {
                  // エラーメッセージを表示する
                  errorMessage.textContent = '保存に失敗しました。';
                  errorMessage.style.display = 'block';
                  // 成功メッセージを非表示にする
                  successMessage.style.display = 'none';
                }

                calendar.unselect();
                modal.remove();
              });
          };

          // DateObject to YYYY-MM-DD
          function formatDate(date) {
            var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

            if (month.length < 2)
              month = '0' + month;
            if (day.length < 2)
              day = '0' + day;
            return [year, month, day].join('-');
          }
        }
      }
      )
    }
  }
})

const setupModalData = (modal, data) => {
  const start = modal.querySelector('#id_date');

  console.log(data);
  if (data.event !== undefined) {
    start.value = /T/.test(data.event.startStr) ? data.event.startStr.split('T')[0] : data.event.startStr;
  }
  else {
    start.value = data.startStr;
  }

};

