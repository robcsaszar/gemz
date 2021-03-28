---
title: Contact
layout: contact
bodyClass: page-contact
forms:
  - to: f/xrgrzjej
    subject: New submission!
    redirect: /
    form_engine: formspree
    placeholders: false
    id: contact-form
    half: form-group col-md-6 col-sm-6 co-xs-12
    full: form-group col-md-12 col-sm-12 co-xs-12
    label_class: input-label
    fields: 
      - name: name
        input_type: text
        placeholder: Numele companiei
        required: true
        half: true
        item_class: input-field
      - name: contactperson
        input_type: text
        placeholder: Persoană de contact
        required: true
        half: true
        item_class: input-field
      - name: email
        input_type: email
        placeholder: Email address
        required: true
        half: true
        item_class: input-field
      - name: telephone
        input_type: tel
        placeholder: Telefon
        required: true
        half: true
        item_class: input-field
      - name: facebook
        input_type: text
        placeholder: Facebook URL
        required: false
        half: false
        item_class: input-field
      - name: instagram
        input_type: text
        placeholder: Instagram URL
        required: false
        half: false
        item_class: input-field
      - name: website
        input_type: text
        placeholder: Website
        required: false
        half: false
        item_class: input-field
      - name: address
        input_type: text
        placeholder: Adresă
        required: false
        half: false
        item_class: input-field
      - name: message
        input_type: textarea
        placeholder: Scrie câteva cuvinte despre business-ul tău
        required: true
        half: false
        item_class: input-field
      - name: terms
        input_type: checkbox
        placeholder: Accept termenii și condițiile pentru colectarea datelor mele personale
        class: checkbox-filters
        required: true
        half: false
      - name: submit
        input_type: submit
        placeholder: Trimite
        required: true
        half: false
        item_class: button
---
Pentru a adăuga business-ul tău, te rugăm să completezi detaliile mai jos și te contactăm pentru mai multe informații privind acesta. După aceasta, pagina magazinului tău va fi disponibilă online în câteva minute!