import { FileUpload } from "graphql-upload";
import * as pdf from "pdf-parse";
import { Service } from "typedi";
import * as urlRegex from "url-regex";

@Service()
export class CvParserService {
  private file: FileUpload;
  private text: string;
  private email: string;
  private phone: string;
  private firstName: string;
  private lastName: string;
  private address: string;
  private jobTitle: string;
  private linkedIn: string;
  private github: string;
  private stackoverflow: string;

  public streamToString = (stream: any) => {
    const chunks: any = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk: any) => chunks.push(Buffer.from(chunk)));
      stream.on("error", (err: any) => reject(err));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  };

  public async parsePdf() {
    const buffer = await this.streamToString(this.file.createReadStream());

    const { text } = await pdf(<Buffer>buffer);

    this.text = text;
    return this.text;
  }

  public async parseEmail() {
    const text = await this.parsePdf();
    let emaillst: any = text.match(
      /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );

    if (emaillst === null) {
      // no Email Address Found
    } else {
      const uniqueEmail: any = Array.from(new Set(emaillst));
      const finaluniqueEmail = [];
      for (let i = 0; i <= uniqueEmail.length; i++) {
        let characterIs = String(uniqueEmail[i]).charAt(
          String(uniqueEmail[i]).length - 1
        );
        if (characterIs === ".") {
          finaluniqueEmail.push(String(uniqueEmail[i].slice(0, -1)));
        } else {
          finaluniqueEmail.push(uniqueEmail[i]);
        }
      }
      emaillst = finaluniqueEmail.join("\n").toLowerCase();

      this.email = emaillst;
    }
    return this.email;
  }

  public async parsePhone() {
    const text = await this.parsePdf();
    let phonelst: any = text.match(
      /(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/gu
    );
    if (phonelst === null) {
      // no Phone Number Found
    } else {
      const uniquePhone: any = Array.from(new Set(phonelst));
      const finaluniquePhone = [];
      for (let i = 0; i <= uniquePhone.length; i++) {
        let characterIs = String(uniquePhone[i]).charAt(
          String(uniquePhone[i]).length - 1
        );
        if (characterIs === ".") {
          finaluniquePhone.push(String(uniquePhone[i].slice(0, -1)));
        } else {
          finaluniquePhone.push(uniquePhone[i]);
        }
      }
      phonelst = finaluniquePhone.join("").toLowerCase();

      this.phone = phonelst;
    }

    return this.phone;
  }

  public async parseName() {
    const text = await this.parsePdf();
    const chars = [...text];
    let name = "";

    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === "\n" && name.length > 0) {
        break;
      }
      if (chars[i] !== "\n") {
        name += chars[i];
      }
    }
    const fullName = name.split(" ");
    const lastName = fullName.pop();
    const firstName = fullName.join(" ");
    this.firstName = firstName;
    if (lastName) {
      this.lastName = lastName;
    }
    return { firstName, lastName };
  }

  public async parseAddress() {
    const text = await this.parsePdf();
    const address: RegExpMatchArray | null = text.match(
      / *\*?Address\s*\*?\s*(.+)/g
    );
    if (address) {
      this.address = address?.join("\n");
    }
    return address?.join("\n");
  }

  public async parseJobTitle() {
    const text = await this.parsePdf();
    const jobTitle: RegExpMatchArray | null = text.match(
      / *\*?Experience\s*\*?\s*(.+)/gi
    );
    if (jobTitle) {
      this.jobTitle = jobTitle?.join("\n");
    }
    return jobTitle?.join("\n");
  }

  public async parseLinkedIn() {
    const text = await this.parsePdf();
    const links = text.match(urlRegex({ strict: false }));

    if (links) {
      links.forEach((link) => {
        if (link.includes("linkedin")) {
          this.linkedIn = link;
        }
      });
    }

    return this.linkedIn;
  }

  public async parseGithub() {
    const text = await this.parsePdf();
    const links = text.match(urlRegex({ strict: false }));

    if (links) {
      links.forEach((link) => {
        if (link.includes("github")) {
          this.github = link;
        }
      });
    }

    return this.github;
  }

  public async parseStackOverFlow() {
    const text = await this.parsePdf();
    const links = text.match(urlRegex({ strict: false }));

    if (links) {
      links.forEach((link) => {
        if (link.includes("stackoverflow")) {
          this.stackoverflow = link;
        }
      });
    }

    return this.stackoverflow;
  }
  public async parseAll(file: FileUpload) {
    this.file = file;
    await this.parseName();
    await this.parseAddress();
    await this.parsePhone();
    await this.parseEmail();
    await this.parseJobTitle();
    await this.parseLinkedIn();
    await this.parseGithub();
    await this.parseStackOverFlow();
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      phone: this.phone,
      email: this.email,
      jobTitle: this.jobTitle,
      linkedIn: this.linkedIn,
      github: this.github,
    };
  }
}
