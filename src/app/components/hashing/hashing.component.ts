import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-hashing',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './hashing.component.html'
})
export class HashingComponent {
  md5Text = '';
  sha256Text = '';
  bcryptText = '';
  md5Hash = '';
  sha256Hash = '';
  bcryptHash = '';

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

  onBcryptInput(value: string) {
    if (!value?.trim()) {
      this.bcryptHash = '';
    }
  }

  async hashSeguroBcrypt() {
    if (!this.bcryptText?.trim()) {
      this.bcryptHash = '';
      return;
    }

    this.bcryptHash = await bcrypt.hash(this.bcryptText, 10);
  }
}
