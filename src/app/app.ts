import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-root',
  imports: [FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hashing-angular');

  md5Text = '';
  sha256Text = '';
  argonText = '';
  md5Hash = '';
  sha256Hash = '';
  argonHash = '';

  hashMD5() {
    if (!this.md5Text?.trim()) {
      this.md5Hash = '';
      return;
    }
    this.md5Hash = CryptoJS.MD5(this.md5Text).toString();
  }

  hashSHA256() {
    if (!this.sha256Text?.trim()) {
      this.sha256Hash = '';
      return;
    }
    this.sha256Hash = CryptoJS.SHA256(this.sha256Text).toString();
  }

  onMd5Input(value: string) {
    if (!value?.trim()) {
      this.md5Hash = '';
    }
  }

  onSha256Input(value: string) {
    if (!value?.trim()) {
      this.sha256Hash = '';
    }
  }

  onArgonInput(value: string) {
    if (!value?.trim()) {
      this.argonHash = '';
    }
  }

  async hashSeguroPBKDF2() {
    if (!this.argonText?.trim()) {
      this.argonHash = '';
      return;
    }

    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(this.argonText);

    // ✅ Crear salt seguro
    const salt = crypto.getRandomValues(new Uint8Array(16));

    // ✅ Importar la contraseña como key
    const key = await crypto.subtle.importKey(
      'raw',
      passwordBytes,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    // ✅ Derivar bits con PBKDF2
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: 150_000,
        hash: 'SHA-256'
      },
      key,
      256
    );

    // ✅ Convertir a hex para mostrar
    const hashArray = Array.from(new Uint8Array(derivedBits));
    this.argonHash = hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
