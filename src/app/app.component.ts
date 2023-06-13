import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ElSalamPapermillUI';
  constructor(private renderer: Renderer2) {}
  ngOnInit() {
    this.loadScript('assets/js/main.js');
  }
  private loadScript(scriptUrl: string) {
    const script = this.renderer.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    this.renderer.appendChild(document.body, script);
  }
}
