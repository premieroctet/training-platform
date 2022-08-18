const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");
const slugify = require("slugify");

const width = 1280;
const height = 960;

type chapterType = {
  path: string;
  course: string;
  chapter: string;
};

export const mergePdfs = (pdfs: string[], outputPdf: string) => {
  require("child_process").execSync(
    `gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -sOutputFile=${outputPdf} ${pdfs.join(
      " "
    )}`,
    { stdio: "inherit" }
  );
};

const getCourseChapters = (courseName: string): chapterType[] => {
  const coursePdfsFolder = path.join("./pdfs", slugify(courseName));
  // make Dir if not exist
  if (!fs.existsSync(coursePdfsFolder)) {
    fs.mkdir(coursePdfsFolder, (err: any) => {
      if (err) return console.error(err);
      console.log("Directory created successfully! : ", coursePdfsFolder);
    });
  }

  return fs.readdirSync(`./courses/${courseName}`).map((chapter: string) => {
    {
      const filename = chapter.replace(".mdx", "");
      return {
        path: `${process.env.NEXT_PUBLIC_FRONT_URL}/${courseName}/${filename}?print`,
        course: slugify(courseName),
        chapter: filename,
      };
    }
  });
};

export const generatePdf = async (courseName: string) => {
  const slug = slugify(courseName);
  const args = [];
  args.push("--no-sandbox", "--disable-setuid-sandbox");

  const browser = await puppeteer.launch({ ...args });
  const page = await browser.newPage();
  page.setExtraHTTPHeaders({
    context: "pdf-export",
  });

  const course = getCourseChapters(courseName);
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
  mergePdfs(files, `pdfs/${slug}.pdf`);
  fs.rmSync(`pdfs/${slug}`, { recursive: true });
};
