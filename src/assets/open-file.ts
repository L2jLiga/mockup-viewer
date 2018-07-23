/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/mockup-viewer/LICENSE
 */

(() => {
  const form = document.forms.item(0);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const mockupInput: HTMLInputElement = form.elements.namedItem('mockup') as HTMLInputElement;

    const file = mockupInput.files[0];

    if (!file) {
      console.error('No file selected!');

      return;
    }

    return uploadFile(file);
  });

  function uploadFile(file) {
    console.log(file);

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('mockup', file);

    xhr.upload.onprogress = (event: ProgressEvent) => {
      console.log(event.loaded + ' / ' + event.total);
    };

    xhr.onload = xhr.onerror = () => {
      if (xhr.status === 200) {
        console.log('success');

        injectMockup(JSON.parse(xhr.responseText).mockups);
      } else {
        console.log('error ' + xhr.status);
      }
    };

    xhr.open('POST', '/open', true);
    xhr.send(formData);
  }

  function injectMockup(mockups) {
    const mockupsList = document.querySelector('.mockups-list');
    const mockupsContainer = document.querySelector('.mockups-container__mockups');

    mockupsList.innerHTML = '';
    mockupsContainer.innerHTML = '';

    if (typeof mockups === 'string') {
      mockupsContainer.innerHTML = mockups;
    } else {
      Object.keys(mockups).map((mockupId) => {
        const parser = new DOMParser();
        const mockupValue = parser.parseFromString(mockups[mockupId], 'image/svg+xml').querySelector('svg:root');

        mockupsList.innerHTML += `<a href="#${mockupValue.id}">${mockupId}</a>`;
        mockupsContainer.appendChild(mockupValue);
      });
    }
  }
})();
