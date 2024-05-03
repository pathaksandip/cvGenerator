declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin: number;
    filename: string;
    image: { type: "jpeg" | "png" ; quality: number };
    html2canvas: { scale: number };
    jsPDF: {
      unit: "pt" | "mm" | "cm" | "in";
      format: "a4" | "a3" | "a2" | "a1" | "letter" | "legal";
      orientation: "portrait" | "landscape";
    };
  }

  function html2pdf(options?: Html2PdfOptions): {
    set(options: Html2PdfOptions): any;
    from(element: HTMLElement): any;
    save(): void;
  };

  export = html2pdf;
}
