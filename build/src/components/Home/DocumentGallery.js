import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
const documents = [
    {
        label: "Authorization Certificate",
        href: "https://drive.google.com/file/d/1ubvg01vha_D_jh2mRpdYnDwNmI7POCDn/view",
        external: true,
    },
    {
        label: "ISO Certificate",
        href: "https://drive.google.com/file/d/1P0IGU5LEnNAAqxfrkC3z8ODHz6be3Otv/view",
        external: true,
    },
    {
        label: "MSME Certificate",
        href: "https://drive.google.com/file/d/1Z1MWXi0rwGUU3cz0RoEdOUdmYLIISIT0/view",
        external: true,
    },
    {
        label: "NGO Darpan Certificate",
        href: "https://drive.google.com/file/d/1182tgrhBzvopiLg593s3fflb1tuhtArS/view",
        external: true,
    },
    {
        label: "Institution Pan Details",
        href: "https://drive.google.com/file/d/1EqL9PCta8-6CXLsofypxfDMF_PNJGACV/view",
        external: true,
    },
    {
        label: "Trust Deed",
        href: "https://drive.google.com/file/d/1bemDujnbcpTY288o_BmlzY5gQBer8FvS/view",
        external: true,
    },
];
const DocumentGallery = () => {
    const navigate = useNavigate();
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
        .carousel-container {
          overflow-x: auto;
          padding: 1rem;
        }

        .carousel-scroll {
          display: flex;
          gap: 1rem;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          min-width: 100%;
          justify-content: center;
        }

        .doc-card {
          background-color: #fff;
          border-radius: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          min-width: 15.5%;
          padding: 1rem;
          flex-shrink: 0;
          scroll-snap-align: start;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: box-shadow 0.3s ease;
        }

        .doc-card:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .thumbnail {
          width: 100%;
          height: 150px;
          background-color: #f1f1f1;
          border-radius: 0.5rem;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #888;
        }

        .doc-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0.5rem 0;
        }

        .view-button {
          background-color: #2563eb;
          color: white;
          padding: 0.5rem;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background-color 0.3s ease;
        }

        .view-button:hover {
          background-color: #1e40af;
        }
      ` }), _jsx("div", { className: "carousel-container", children: _jsx("div", { className: "carousel-scroll", children: documents.map((doc, index) => (_jsxs("div", { className: "doc-card", children: [_jsx("div", { className: "thumbnail", style: { fontSize: "80px" }, children: "\uD83D\uDCC4" }), _jsx("h3", { className: "doc-title", children: doc.label }), _jsx("button", { className: "view-button", onClick: () => {
                                    if (doc.external) {
                                        window.open(doc.href, "_blank");
                                    }
                                    else {
                                        navigate(doc.href);
                                    }
                                }, children: _jsx(Eye, { size: 24 }) })] }, index))) }) })] }));
};
export default DocumentGallery;
