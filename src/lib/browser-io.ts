/**
 * Small helpers shared by the tools: clipboard access, "save as" downloads and
 * reading a file the user picked. In the Angular app each component carried its
 * own copy of these.
 */

/** Copies text to the clipboard, then shows `message` in an alert. */
export function copyToClipboard(text: string, message: string): void {
  const notify = () => window.alert(message);

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(notify, () => {
      legacyCopy(text);
      notify();
    });
    return;
  }

  legacyCopy(text);
  notify();
}

/**
 * Clipboard fallback for browsers without the async clipboard API, or when the
 * page is not in a secure context. This is what the Angular version always did.
 */
function legacyCopy(text: string): void {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

/** Triggers a download of `text` as `filename`. */
export function download(filename: string, text: string): void {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/** Reads the file chosen in a file input and hands its text to `onLoaded`. */
export function readUploadedFile(
  event: React.ChangeEvent<HTMLInputElement>,
  onLoaded: (text: string) => void,
): void {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  void file.text().then((text) => onLoaded(text.toString()));

  // Allows picking the same file twice in a row.
  event.target.value = '';
}
