import React from 'react'
import './Contact.component.scss'

const Contact = () => (
  <div className='contact-container'>
    <form action='action_page.php'>

      <label htmlFor='fname'>Име</label>
      <input type='text' id='fname' name='firstname' placeholder='Вашето име' />

      <label htmlFor='lname'>Електронна поща</label>
      <input
        type='text'
        id='lname'
        name='lastname'
        placeholder='Вашата електронна поща, за обратна връзка'
      />
      <label htmlFor='phone-number'>Телефон за контакт</label>
      <input
        type='text'
        id='phone-number'
        name='phone-number'
        placeholder='Вашия телефонен номер, за обратна връзка'
      />
      <label htmlFor='subject'>Заглавие</label>
      <input

        type='text'
        id='subject'
        name='subject'
        placeholder='Пиша ви защото...'
      />
      <label htmlFor='subject'>Съобщение</label>
      <textarea
        id='subject'
        name='subject'
        placeholder='Напишете вашето съобщение...'
      />
      <div className="contact-submit-wrap">
      <input className='contact-submit' type='submit' value='Submit' />

      </div>
    </form>
  </div>
)

export default Contact
