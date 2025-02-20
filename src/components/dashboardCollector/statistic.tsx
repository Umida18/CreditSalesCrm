import { useState, useEffect } from "react";
import { Card, Col, Row, Select, Spin } from "antd";
import { Users, DollarSign, UserCheck, UserX } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import { CollectorLayout } from "../collectorLayout";

interface StatisticsData {
  zonedagi_tolaganlar: number;
  bu_oy_tolagan: number;
  hamma_users: number;
  tolamagan_users: number;
}

interface CollectorStatistics {
  // Add properties based on the actual response
  totalUsers?: number;
  paidUsers?: number;
  unpaidUsers?: number;
}

interface Workplace {
  id: number;
  name: string;
  // Add other properties as needed
}

interface Collector {
  id: number;
  name: string;
  // Add other properties as needed
}

interface Zone {
  id: number;
  name: string;
  // Add other properties as needed
}

export default function StatisticsContent() {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [collectorStats, setCollectorStats] =
    useState<CollectorStatistics | null>(null);
  const [workplaces, setWorkplaces] = useState<Workplace[]>([]);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCollector, setSelectedCollector] = useState<number | null>(
    null
  );
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [selectedWorkplace, setSelectedWorkplace] = useState<number | null>(
    null
  );

  const searchParams = useSearchParams();
  //   const zoneId = searchParams.get("zoneId")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch initial statistics
        const statsRes = await fetch(`${BASE_URL}/zone/about`);
        const statsData: StatisticsData = await statsRes.json();
        setStatistics(statsData);

        // Fetch zones
        const zonesRes = await fetch(`${BASE_URL}/zone`);
        const zonesData: Zone[] = await zonesRes.json();
        setZones(zonesData);

        // Fetch collectors
        const collectorsRes = await fetch(`${BASE_URL}/collector`);
        const collectorsData: Collector[] = await collectorsRes.json();
        setCollectors(collectorsData);

        // Fetch workplaces
        const workplacesRes = await fetch(`${BASE_URL}/workplace`);
        const workplacesData: Workplace[] = await workplacesRes.json();
        setWorkplaces(workplacesData);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCollectorStats = async () => {
      if (selectedCollector && selectedZone) {
        try {
          setLoading(true);
          const res = await fetch(
            `${BASE_URL}/api/collector/statistic-by-users-zone`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                collector_id: selectedCollector,
                zone_id: selectedZone,
              }),
            }
          );
          const data: CollectorStatistics = await res.json();
          setCollectorStats(data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch collector statistics. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchCollectorStats();
  }, [selectedCollector, selectedZone]);

  const handleCollectorChange = (value: number) => setSelectedCollector(value);
  const handleZoneChange = (value: number) => setSelectedZone(value);
  const handleWorkplaceChange = (value: number) => setSelectedWorkplace(value);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <CollectorLayout>
      <div className="space-y-6">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Spin spinning={loading}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-2xl font-semibold">
                      {statistics?.hamma_users || 0}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </Spin>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Spin spinning={loading}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Paid This Month</p>
                    <p className="text-2xl font-semibold">
                      {statistics?.bu_oy_tolagan || 0}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </Spin>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Spin spinning={loading}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Paid in Zone</p>
                    <p className="text-2xl font-semibold">
                      {statistics?.zonedagi_tolaganlar || 0}
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-indigo-500" />
                </div>
              </Spin>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Spin spinning={loading}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Unpaid Users</p>
                    <p className="text-2xl font-semibold">
                      {statistics?.tolamagan_users || 0}
                    </p>
                  </div>
                  <UserX className="h-8 w-8 text-red-500" />
                </div>
              </Spin>
            </Card>
          </Col>
        </Row>

        <Card title="Filter Statistics">
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Collector"
                onChange={handleCollectorChange}
                options={collectors.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Zone"
                onChange={handleZoneChange}
                options={zones.map((z) => ({ value: z.id, label: z.name }))}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Select
                style={{ width: "100%" }}
                placeholder="Select Workplace"
                onChange={handleWorkplaceChange}
                options={workplaces.map((w) => ({
                  value: w.id,
                  label: w.name,
                }))}
              />
            </Col>
          </Row>
        </Card>

        {collectorStats && (
          <Card title="Collector Statistics">
            <Spin spinning={loading}>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-xl font-semibold">
                    {collectorStats.totalUsers || 0}
                  </p>
                </Col>
                <Col xs={24} sm={8}>
                  <p className="text-sm text-gray-500">Paid Users</p>
                  <p className="text-xl font-semibold">
                    {collectorStats.paidUsers || 0}
                  </p>
                </Col>
                <Col xs={24} sm={8}>
                  <p className="text-sm text-gray-500">Unpaid Users</p>
                  <p className="text-xl font-semibold">
                    {collectorStats.unpaidUsers || 0}
                  </p>
                </Col>
              </Row>
            </Spin>
          </Card>
        )}
      </div>
    </CollectorLayout>
  );
}
