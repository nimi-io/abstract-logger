import fs from "fs";

interface IFileReader {
  isJSONFile(file: string): boolean;
  readText(file: string): string;
  readJson(file: string): unknown;
}

class DirectoryScrapper {
  constructor(public dirPath: string, public fileReader: IFileReader) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<any>((acc: any, file: string) => {
        if (this.fileReader.isJSONFile(file)) {
          acc[file] = this.fileReader.readJson(`${this.dirPath}/${file}`);
        } else {
          acc[file] = this.fileReader.readText(`${this.dirPath}/${file}`);
        }

        return acc;
      }, {});
  }
}

class FileReader implements IFileReader {
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

const fileReader = new FileReader();

const dirScrapper = new DirectoryScrapper("./data", fileReader);

console.log(dirScrapper.scanFiles());
