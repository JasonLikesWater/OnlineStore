import { useEffect, useState } from "react";
import type { Sale } from "../../interfaces";

function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/sales/active");
        if (!res.ok) {
          setError(`Server returned ${res.status}`);
          setSales([]);
          return;
        }
        const data: Sale[] = await res.json();
        setSales(data);
      } catch (err) {
        setError("Failed to fetch sales");
        setSales([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  return (
    <div>
      <div className="tile-pattern">
        <div className="tile-3"></div>
      </div>
      <div className="container py-5 text-light">
        <h1 className="my-4 catalog-header text-center">Current Sales</h1>
        <div className="d-flex flex-column align-items-center gap-3">
          {loading && <div>Loading sales…</div>}
          {error && <div className="text-danger">{error}</div>}
          {!loading && sales.length === 0 && !error && (
            <div className="text-muted">No current sales</div>
          )}
          {!loading &&
            sales.map((sale, index) => (
              <div
                key={sale.saleId ?? index}
                className="card shadow-sm text-center"
                style={{
                  maxWidth: "500px",
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-1">
                    {sale.category} Movies are{" "}
                    <span className="text-success fw-bold">
                      {sale.discount}% off!
                    </span>
                  </h5>
                  <div className="text-muted small">
                    Until {new Date(sale.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SalesPage;