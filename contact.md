---
title: Contact
layout: contact
bodyClass: page-contact
forms:
  - to: rob.csaszar@gmail.com
    subject: New submission!
    redirect: /
    form_engine: formspree
    placeholders: false
    fields: 
      - name: name
        input_type: text
        placeholder: Name
        required: true
      - name: email
        input_type: email
        placeholder: Email address
        required: true
      - name: sex
        input_type: radio
        placeholder: male
        required: true
      - name: sex
        input_type: radio
        placeholder: female
        required: true
      - name: message
        input_type: textarea
        placeholder: Message
        required: false
      - name: terms
        input_type: checkbox
        placeholder: I accept the terms and conditions
        required: true
      - name: submit
        input_type: submit
        placeholder: Submit form
        required: true
---
Pentru a adăuga business-ul tău, completează detaliile mai jos și te contactăm pentru mai multe informații privind acesta. După aceasta, pagina magazinului tău va fi disponibilă online în câteva minute! 