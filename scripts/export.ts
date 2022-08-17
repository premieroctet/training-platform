const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");
const slugify = require("slugify");

const width = 1280;
const height = 960;
const webApp = "http://localhost:3000/";

type chapterType = {
  path: string;
  course: string;
  chapter: string;
};

const mergePdf = (pdfs: string[], outputPdf: string) => {
  require("child_process").execSync(
    `gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -sOutputFile=${outputPdf} ${pdfs.join(
      " "
    )}`,
    { stdio: "inherit" }
  );
};

const courses: chapterType[][] = fs
  .readdirSync("./courses")
  //.filter((name) => name === "TypeScript")
  .filter((course) => {
    const courseDirectory = path.join("./courses/", course);
    if (!fs.statSync(courseDirectory).isDirectory() || course === "assets") {
      return false;
    }
    return true;
  })
  .map((course: string[]) => {
    const coursePath = path.join("./pdfs", slugify(course));
    // make Dir if not exist
    if (!fs.existsSync(coursePath)) {
      fs.mkdir(coursePath, (err: any) => {
        if (err) return console.error(err);
        console.log("Directory created successfully! : ", coursePath);
      });
    }
    return fs.readdirSync(`./courses/${course}`).map((chapter: string) => {
      {
        const filename = chapter.replace(".mdx", "");
        return {
          path: `${webApp}${course}/${filename}?print`,
          course: slugify(course),
          chapter: filename,
        };
      }
    });
  });

const main = async () => {
  const args = [];
  args.push("--no-sandbox", "--disable-setuid-sandbox");

  for (const course of courses) {
    const browser = await puppeteer.launch({ ...args });
    const page = await browser.newPage();
    page.setExtraHTTPHeaders({
      context: "pdf-export",
    });

    const files: string[] = [];
    for (const chapter of course) {
      const filename = path.join(
        "./pdfs",
        slugify(chapter.course),
        slugify(chapter.chapter + ".pdf")
      );

      files.push(filename);
      console.log(`Generating ${filename}`);

      await page.setDefaultNavigationTimeout(0);
      await page.goto(chapter.path, {
        waitUntil: "networkidle2",
      });

      await page.pdf({
        width,
        height,
        path: filename,
        scale: 1,
        printBackground: true,
        format: "A4",
        landscape: true,
        displayHeaderFooter: false,
      });
    }

    await browser.close();
    const courseName = course[0].course;
    mergePdf(files, `pdfs/${courseName}.pdf`);
    fs.rmSync(`pdfs/${courseName}`, { recursive: true });
  }
};

main();
