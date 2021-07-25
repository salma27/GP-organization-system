import { useEffect, useState } from "react";
import "./Paginate.css";

const Paginate = ({ children, pageLimit = 3, dataLimit = 5 }) => {
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        let pgs = Math.ceil(children.length / dataLimit);
        if (pgs > 1) setPages(pgs);
        console.log("use effect trigger");
    }, [children]);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
        window.scrollTo(0, 0);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
        window.scrollTo(0, 0);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return children.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let pg = pageLimit;
        if (pg >= children.length) pg = children.length;
        let start = Math.floor((currentPage - 1) / pg) * pg;
        return new Array(pg).fill().map((_, idx) => start + idx + 1);
    };

    if (!children.length)
        return (
            <div className="d-flex justify-content-center">
                <i className="fas fa-spinner fa-spin fa-lg"></i>
            </div>
        );

    return (
        <div>
            <div className="dataContainer">
                {getPaginatedData().map((d, idx) => d)}
            </div>
            <div className="pagination">
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                >
                    {"<"}
                </button>
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${
                            currentPage === item ? "active" : null
                        }`}
                    >
                        <span>{item}</span>
                    </button>
                ))}
                <button
                    onClick={goToNextPage}
                    className={`next ${
                        currentPage === pages ? "disabled" : ""
                    }`}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Paginate;
