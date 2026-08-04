import { useState } from 'react';

import './LoremIpsum.css';

const loremWords = [
  // Classic Lorem Ipsum opening
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',

  // From Cicero's "de Finibus Bonorum et Malorum" sections 1.10.32 and 1.10.33
  'at', 'vero', 'eos', 'accusamus', 'accusantium', 'doloremque', 'laudantium',
  'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore',
  'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'explicabo',
  'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit',
  'consequuntur', 'magni', 'dolores', 'ratione', 'sequi', 'nesciunt', 'neque',
  'porro', 'quisquam', 'dolorem', 'adipisci', 'numquam', 'eius', 'modi',
  'tempora', 'incidunt', 'magnam', 'quaerat', 'voluptatem', 'aliquam',
  'quibusdam', 'officiis', 'debitis', 'rerum', 'necessitatibus', 'saepe',
  'eveniet', 'voluptates', 'repudiandae', 'molestiae', 'mollitia', 'animi',
  'assumenda', 'omnis', 'est', 'error', 'similique', 'expedita', 'distinctio',
  'nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis', 'eligendi', 'optio',
  'cumque', 'nihil', 'impedit', 'quo', 'minus', 'maxime', 'placeat', 'facere',
  'possimus', 'assumenda', 'repellendus', 'temporibus', 'autem', 'quibusdam',
  'officiis', 'debitis', 'rerum', 'necessitatibus', 'saepe', 'eveniet',
  'voluptates', 'repudiandae', 'molestiae', 'mollitia', 'animi', 'itaque',
  'earum', 'hic', 'tenetur', 'sapiente', 'delectus', 'reiciendis', 'maiores',
  'alias', 'perferendis', 'doloribus', 'asperiores', 'repellat', 'impedit',
  'quo', 'minus', 'maxime', 'placeat', 'facere', 'possimus', 'omnis',
  'voluptas', 'assumenda', 'repellendus', 'temporibus', 'autem', 'quibusdam',
  'et', 'harum', 'quidem', 'rerum', 'facilis', 'expedita', 'distinctio',
  'nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis', 'eligendi', 'optio',
  'cumque', 'nihil', 'impedit', 'quo', 'temporibus', 'autem', 'quibusdam',
  'et', 'aut', 'officiis', 'debitis', 'aut', 'rerum', 'necessitatibus',
  'saepe', 'eveniet', 'ut', 'et', 'voluptates', 'repudiandae', 'sint',
  'et', 'molestiae', 'non', 'recusandae', 'itaque', 'earum', 'rerum',
  'hic', 'tenetur', 'a', 'sapiente', 'delectus', 'ut', 'aut', 'reiciendis',
  'voluptatibus', 'maiores', 'alias', 'consequatur', 'aut', 'perferendis',
  'doloribus', 'asperiores', 'repellat', 'hanc', 'soluta', 'nobis', 'est',
  'eligendi', 'optio', 'cumque', 'nihil', 'impedit', 'quo', 'minus',
  'id', 'quod', 'maxime', 'placeat', 'facere', 'possimus', 'omnis',
  'voluptas', 'assumenda', 'est', 'omnis', 'dolor', 'repellendus',
  'temporibus', 'autem', 'quibusdam', 'et', 'aut', 'officiis', 'debitis',
  'aut', 'rerum', 'necessitatibus', 'saepe', 'eveniet', 'ut', 'et',
  'voluptates', 'repudiandae', 'sint', 'et', 'molestiae', 'non', 'recusandae',
];

function randomWord(): string {
  return loremWords[Math.floor(Math.random() * loremWords.length)];
}

function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateWords(length: number, startLorem: boolean): string {
  const words: string[] = [];
  let wordsToGenerate = length;

  if (startLorem) {
    words.push('Lorem', 'ipsum');
    wordsToGenerate = Math.max(0, length - 2);
  }

  for (let i = 0; i < wordsToGenerate; i++) {
    words.push(randomWord());
  }

  return words.join(' ');
}

function generateParagraphs(length: number, startLorem: boolean): string {
  const paragraphs: string[] = [];

  for (let p = 0; p < length; p++) {
    const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences per paragraph
    const sentences: string[] = [];

    for (let s = 0; s < sentenceCount; s++) {
      const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words per sentence
      const words: string[] = [];

      for (let w = 0; w < wordCount; w++) {
        if (p === 0 && s === 0 && w === 0 && startLorem) {
          words.push('Lorem', 'ipsum');
          w++; // Skip one iteration since we added two words
          if (w >= wordCount) break;
        } else {
          words.push(randomWord());
        }
      }

      // Capitalize first word and add period
      if (words.length > 0) {
        words[0] = capitalizeFirstLetter(words[0]);
        sentences.push(words.join(' ') + '.');
      }
    }

    paragraphs.push(sentences.join(' '));
  }

  return paragraphs.join('\n\n');
}

export default function LoremIpsum() {
  const [output, setOutput] = useState('');
  const [length, setLength] = useState(1);
  const [type, setType] = useState('paragraph');
  const [startLorem, setStartLorem] = useState(false);

  const generateClicked = () => {
    if (type === 'word') {
      setOutput(generateWords(length, startLorem));
    } else if (type === 'paragraph') {
      setOutput(generateParagraphs(length, startLorem));
    }
  };

  return (
    <div className="container lorem-ipsum">
      <div className="row">
        <div className="col">
          <h1>Lorem Ipsum</h1>
          <div className="row">
            <div className="col">
              <label>Type</label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="word">Word</option>
                <option value="paragraph">Paragrah</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Length</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Starts With Lorem ipsum</label>
              <select
                className="form-select"
                value={startLorem ? 'true' : 'false'}
                onChange={(e) => setStartLorem(e.target.value === 'true')}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button type="button" className="mt-1 btn btn-primary" onClick={generateClicked}>
                Generate
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header">Text</div>
            <div className="card-body">
              <textarea className="form-control" readOnly rows={10} value={output} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
