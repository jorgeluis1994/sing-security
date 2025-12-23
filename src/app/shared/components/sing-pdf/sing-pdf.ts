import { Component, ElementRef, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import Quill from 'quill';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sing-pdf',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './sing-pdf.html',
})
export class SingPdf implements AfterViewInit {

  @ViewChild('editor', { static: true }) editorRef!: ElementRef;

  @Output() htmlChange = new EventEmitter<string>();
  @Output() signaturePosition = new EventEmitter<number>();

  private quill!: Quill;

  ngAfterViewInit() {
    this.quill = new Quill(this.editorRef.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link']
        ]
      }
    });

    this.quill.on('text-change', () => {
      const html = this.editorRef.nativeElement.querySelector('.ql-editor').innerHTML;
      console.log('📄 HTML desde Quill:', html);
      this.htmlChange.emit(html);
    });
  }

  markSignature() {
    const html = this.editorRef.nativeElement.querySelector('.ql-editor').innerHTML;

    if (html.includes('[FIRMA_AQUI]')) return;

    this.quill.clipboard.dangerouslyPasteHTML(
      html + '<p><strong style="color:red">[FIRMA_AQUI]</strong></p>'
    );

    this.signaturePosition.emit(html.length);
  }
}
