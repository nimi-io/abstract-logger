import fs from "fs";

interface IFileReader {}

abstract class DirectoryScrapper {
  constructor(public dirPath: string, ) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<any>((acc: any, file: string) => {
        if (this.isJSONFile(file)) {
          acc[file] = this.readJson(`${this.dirPath}/${file}`);
        } else {
          acc[file] = this.readText(`${this.dirPath}/${file}`);
        }

        return acc;
      }, {});
  }

  abstract isJSONFile(file: string): boolean;
  abstract readText(file: string): string;
  abstract readJson(file: string): unknown;
}

class FileReader extends DirectoryScrapper {
  isJSONFile(file: string): boolean {
    return file.endsWith(".json");
  }
  readText(file: string): string {
    return fs.readFileSync(file, "utf8").toString();
  }
  readJson(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, "utf8").toString());
  }
}

const fileReader = new FileReader("./data");



console.log(fileReader.scanFiles());
