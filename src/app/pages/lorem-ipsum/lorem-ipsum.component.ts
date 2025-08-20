import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lorem-ipsum',
  templateUrl: './lorem-ipsum.component.html',
  styleUrls: ['./lorem-ipsum.component.css']
})
export class LoremIpsumComponent implements OnInit {

  output: string = "";
  length: number = 1;
  type: string = "paragraph";
  startLorem: boolean = false;

  private readonly loremWords = [
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
    'voluptates', 'repudiandae', 'sint', 'et', 'molestiae', 'non', 'recusandae'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  generateClicked() {
    if (this.type === 'word') {
      this.generateWords();
    } else if (this.type === 'paragraph') {
      this.generateParagraphs();
    }
  }

  private generateWords() {
    const words = [];
    let wordsToGenerate = this.length;
    
    if (this.startLorem) {
      words.push('Lorem', 'ipsum');
      wordsToGenerate = Math.max(0, this.length - 2);
    }
    
    for (let i = 0; i < wordsToGenerate; i++) {
      const randomIndex = Math.floor(Math.random() * this.loremWords.length);
      words.push(this.loremWords[randomIndex]);
    }
    
    this.output = words.join(' ');
  }

  private generateParagraphs() {
    const paragraphs = [];
    
    for (let p = 0; p < this.length; p++) {
      const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences per paragraph
      const sentences = [];
      
      for (let s = 0; s < sentenceCount; s++) {
        const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words per sentence
        const words = [];
        
        for (let w = 0; w < wordCount; w++) {
          if (p === 0 && s === 0 && w === 0 && this.startLorem) {
            words.push('Lorem', 'ipsum');
            w++; // Skip one iteration since we added two words
            if (w >= wordCount) break;
          } else {
            const randomIndex = Math.floor(Math.random() * this.loremWords.length);
            words.push(this.loremWords[randomIndex]);
          }
        }
        
        // Capitalize first word and add period
        if (words.length > 0) {
          words[0] = this.capitalizeFirstLetter(words[0]);
          sentences.push(words.join(' ') + '.');
        }
      }
      
      paragraphs.push(sentences.join(' '));
    }
    
    this.output = paragraphs.join('\n\n');
  }

  private capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}