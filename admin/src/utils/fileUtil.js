import axios from 'axios';

export const encodeFileToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
  });
};

export const preparePayload = async (data) => {
  for (const item of data.answer) {
    if (item.value instanceof File) {
      item.fileName = item.value.name;
      item.value = await encodeFileToBase64(item.value);
    }
  }
  return data;
};

export const prepareJourneyPayload = async (data) => {
  console.log(data);
  for (const item of data) {
    if (item.value instanceof File) {
      item.fileName = item.value.name;
      item.value = await encodeFileToBase64(item.value);
    }
  }
  return data;
};

export const setFileInputPreview = async (inputName, fileUrl) => {
    const response = await axios.get(fileUrl, {
        responseType: 'blob'
      });
      let fileName = fileUrl.split('/').pop();
      fileName = fileName.split('?')[0];
      const extension = fileName.match(/\.([0-9a-z]+)(?=[?&].*$|$)/i);
      const file = new File([response.data], fileName, { 
        type: getMimeTypeFromExtension(extension[1]), 
        lastModified: new Date().getTime() 
      });

    if (!file || !file.type) return;
  
    const fileInput = document.querySelector(`input[name="${inputName}"]`);
    console.log(fileInput);
    
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    console.log(dataTransfer);
    fileInput.files = dataTransfer.files;

    console.log(fileInput.files);
    const event = new Event('change', { bubbles: true });
    fileInput.dispatchEvent(event);
  };

  const getMimeTypeFromExtension = (extension) => {
    console.log(extension);
    const mimeTypes = {
        'aac': 'audio/aac',
        'abw': 'application/x-abiword',
        'arc': 'application/x-freearc',
        'avi': 'video/x-msvideo',
        'azw': 'application/vnd.amazon.ebook',
        'bin': 'application/octet-stream',
        'bmp': 'image/bmp',
        'bz': 'application/x-bzip',
        'bz2': 'application/x-bzip2',
        'csh': 'application/x-csh',
        'css': 'text/css',
        'csv': 'text/csv',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'eot': 'application/vnd.ms-fontobject',
        'epub': 'application/epub+zip',
        'gif': 'image/gif',
        'htm': 'text/html',
        'html': 'text/html',
        'ico': 'image/vnd.microsoft.icon',
        'ics': 'text/calendar',
        'jar': 'application/java-archive',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'js': 'text/javascript',
        'json': 'application/json',
        'jsonld': 'application/ld+json',
        'mid': 'audio/midi',
        'midi': 'audio/midi',
        'mjs': 'text/javascript',
        'mp3': 'audio/mpeg',
        'mp4': 'video/mp4',
        'mpeg': 'video/mpeg',
        'mpkg': 'application/vnd.apple.installer+xml',
        'odp': 'application/vnd.oasis.opendocument.presentation',
        'ods': 'application/vnd.oasis.opendocument.spreadsheet',
        'odt': 'application/vnd.oasis.opendocument.text',
        'oga': 'audio/ogg',
        'ogv': 'video/ogg',
        'ogx': 'application/ogg',
        'otf': 'font/otf',
        'png': 'image/png',
        'pdf': 'application/pdf',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'rar': 'application/x-rar-compressed',
        'rtf': 'application/rtf',
        'sh': 'application/x-sh',
        'svg': 'image/svg+xml',
        'swf': 'application/x-shockwave-flash',
        'tar': 'application/x-tar',
        'tif': 'image/tiff',
        'tiff': 'image/tiff',
        'ts': 'video/mp2t',
        'ttf': 'font/ttf',
        'txt': 'text/plain',
        'vsd': 'application/vnd.visio',
        'wav': 'audio/wav',
        'weba': 'audio/webm',
        'webm': 'video/webm',
        'webp': 'image/webp',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'xhtml': 'application/xhtml+xml',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xml': 'application/xml',
        'xul': 'application/vnd.mozilla.xul+xml',
        'zip': 'application/zip',
        '3gp': 'video/3gpp',
        '3g2': 'video/3gpp2',
        '7z': 'application/x-7z-compressed'
    };

    // Convert extension to lowercase and remove leading dot if present
    extension = extension.toLowerCase().replace(/^\./, '');

    // Return the MIME type if found, otherwise return a default type
    return mimeTypes[extension] || 'application/octet-stream';
}
  