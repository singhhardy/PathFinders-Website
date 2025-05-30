  $(document).ready(function () {

    // === CONTACT FORM SUBMIT ===
    $('#contactForm').on('submit', function (e) {
      e.preventDefault();

      const $form = $(this);
      const $loading = $form.find('.loading');
      const $errorMessage = $form.find('.error-message');
      const $sentMessage = $form.find('.sent-message');

      // Show loading, hide messages
      $loading.show();
      $errorMessage.hide();
      $sentMessage.hide();

      const data = {
        name: $form.find('[name="name"]').val(),
        email: $form.find('[name="email"]').val(),
        subject: $form.find('[name="subject"]').val(),
        message: $form.find('[name="message"]').val()
      };

      $.ajax({
        url: 'https://pb-backend-five.vercel.app/send-email',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
          $loading.hide();
          if (response.success) {
            $sentMessage.show();
            $form[0].reset();
          } else {
            $errorMessage.text(response.message || 'Something went wrong.').show();
          }
        },
        error: function () {
          $loading.hide();
          $errorMessage.text('Something went wrong.').show();
        }
      });
    });

    // === CONSULTATION MODAL ON LOAD ===
    setTimeout(function () {
      const modal = new bootstrap.Modal($('#welcomeModal')[0]);
      modal.show();
    }, 3000); // 3 seconds

    // === BOOK A CALL ===
    $('.bookConsult').on('click', function () {
      const phone = $('#consultPhone').val().trim();
      $('.bookConsult').text('Submitting...')
      $('#bookConsult').attr('disabled', true)

      if (!phone || phone.length < 10) {
        toastr.warning('Please enter a valid phone number');
        $('#bookConsult').attr('disabled', false);
        return;
      }

      $.ajax({
        url: 'https://pb-backend-five.vercel.app/book-call',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ phone }),
        success: function (result) {
          if (result.success) {
            $('#bookConsult').attr('disabled', false)
            $('.bookConsult').text('Submit')
            toastr.success('Thank you! We’ll contact you soon.');
            $('#consultPhone').val('');
            $('#welcomeModal').modal('hide');
          } else {
            toastr.error('Could not send request. Please try again.');
          }
        },
        error: function () {
          $('#bookConsult').attr('disabled', false)
          $('.bookConsult').text('Submit')
          toastr.error('Something went wrong. Please try again later.');
        }
      });
    });

  });