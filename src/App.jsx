
import {
  LayoutDashboard,
  FileText,
  Building2,
  ShieldCheck,
  Settings,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Menu,
  LogIn,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import api from './api'

const stats = [
  {
    title: 'Total Invoices',
    value: '1,284',
    change: '+12.8%',
    positive: true,
    icon: FileText,
    color: 'blue',
  },
  {
    title: 'Pending Review',
    value: '42',
    change: '+5.2%',
    positive: false,
    icon: Clock,
    color: 'amber',
  },
  {
    title: 'High Risk',
    value: '18',
    change: '-8.4%',
    positive: true,
    icon: AlertTriangle,
    color: 'red',
  },
  {
    title: 'Approved',
    value: '1,096',
    change: '+9.2%',
    positive: true,
    icon: CheckCircle2,
    color: 'green',
  },
]
function Sidebar({ activePage = 'Dashboard', onNavigate }) {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Invoices', icon: FileText },
    { label: 'Vendors', icon: Building2 },
    { label: 'Risk Reviews', icon: ShieldCheck },
    { label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <ShieldCheck size={23} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            InvoiceGuard
          </h1>
          <p className="text-xs text-slate-500">Risk Management</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.label

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate?.(item.label)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            MV
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              Manthan Verma
            </p>
            <p className="truncate text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
function Header({
  activePage = 'Dashboard',
  onNewInvoice,
  onMenuClick,
}) {
  const pageDetails = {
    Dashboard: {
      title: 'Dashboard',
      subtitle: 'Monitor your invoice risk and approvals.',
    },
    Invoices: {
      title: 'Invoices',
      subtitle: 'View and manage your invoices.',
    },
    Vendors: {
      title: 'Vendors',
      subtitle: 'Manage your vendor information.',
    },
    'Risk Reviews': {
      title: 'Risk Reviews',
      subtitle: 'Review invoices flagged for risk.',
    },
    Settings: {
      title: 'Settings',
      subtitle: 'Manage your workspace settings.',
    },
  }

  const currentPage = pageDetails[activePage] || pageDetails.Dashboard

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {currentPage.title}
          </h2>
          <p className="hidden text-sm text-slate-500 sm:block">
            {currentPage.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 md:flex">
          <Search size={17} className="text-slate-400" />
          <input
            type="search"
            className="w-36 text-sm outline-none"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>

        <span
          className="relative rounded-lg border border-slate-200 p-2.5 text-slate-600"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </span>

        <button
          type="button"
          onClick={onNewInvoice}
          className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 sm:flex"
        >
          <Plus size={17} />
          New Invoice
        </button>
      </div>
    </header>
  )
}
function StatCard({ stat }) {
  const Icon = stat.icon

  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{stat.title}</p>
          <h3 className="mt-3 text-2xl font-bold text-slate-900">
            {stat.value}
          </h3>
        </div>
        <div className={`rounded-xl p-3 ${colors[stat.color]}`}>
          <Icon size={21} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs">
        {stat.positive ? (
          <ArrowUpRight size={15} className="text-green-600" />
        ) : (
          <ArrowDownRight size={15} className="text-red-600" />
        )}
        <span className={stat.positive ? 'text-green-600' : 'text-red-600'}>
          {stat.change}
        </span>
        <span className="text-slate-400">vs last month</span>
      </div>
    </div>
  )
}

function RiskBadge({ risk }) {
  const styles = {
    Low: 'bg-green-50 text-green-700',
    Medium: 'bg-amber-50 text-amber-700',
    High: 'bg-red-50 text-red-700',
    Critical: 'bg-purple-50 text-purple-700',
    Unscored: 'bg-slate-100 text-slate-600',
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[risk] || 'bg-slate-100 text-slate-600'
      }`}
    >
      {risk}
    </span>
  )
}
function StatusBadge({ status }) {
  const statusLabels = {
    DRAFT: 'Draft',
    SUBMITTED: 'Submitted',
    ANALYSING: 'Analysing',
    REVIEW_REQUIRED: 'Review Required',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    PAID: 'Paid',
    CANCELLED: 'Cancelled',
    ARCHIVED: 'Archived',
  }

  const styles = {
    DRAFT: 'bg-slate-100 text-slate-600',
    SUBMITTED: 'bg-blue-50 text-blue-700',
    ANALYSING: 'bg-blue-50 text-blue-700',
    REVIEW_REQUIRED: 'bg-amber-50 text-amber-700',
    APPROVED: 'bg-green-50 text-green-700',
    REJECTED: 'bg-red-50 text-red-700',
    PAID: 'bg-green-50 text-green-700',
    CANCELLED: 'bg-slate-100 text-slate-600',
    ARCHIVED: 'bg-slate-100 text-slate-600',
  }

  const normalizedStatus = String(status || '').toUpperCase()
  const label = statusLabels[normalizedStatus] || status || 'Unknown'

  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[normalizedStatus] || 'bg-slate-100 text-slate-600'
      }`}
    >
      {label}
    </span>
  )
}
function InvoiceTable({
  invoices = [],
  loading = false,
  error = '',
  title = 'Recent Invoices',
  subtitle = 'Review recently submitted invoices.',
}) {
  const formatDate = (value) => {
    if (!value) return '—'

    const date = new Date(value)

    return Number.isNaN(date.getTime())
      ? '—'
      : date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
  }

  const formatAmount = (amount, currency) =>
    `${currency || ''} ${Number(amount ?? 0).toLocaleString('en-IN')}`.trim()

  if (loading) {
    return (
      <p className="rounded-xl border bg-white p-5 text-sm text-slate-500">
        Loading invoices...
      </p>
    )
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        {error}
      </p>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
        <div>
          <h3 className="font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Invoice</th>
              <th className="px-5 py-4 font-semibold">Vendor ID</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Amount</th>
              <th className="px-5 py-4 font-semibold">Risk</th>
              <th className="px-5 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-8 text-center text-slate-500"
                >
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                    {invoice.invoiceNumber || invoice.id}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {invoice.vendorId || '—'}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    {formatDate(invoice.invoiceDate)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                    {formatAmount(invoice.totalAmount, invoice.currency)}
                  </td>

                  <td className="px-5 py-4">
                    <RiskBadge risk={invoice.riskLevel || 'Unscored'} />
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={invoice.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
function InvoicesPage({ showForm, onCancel }) {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    invoiceNumber: '',
    vendorId: '',
    invoiceDate: '',
    dueDate: '',
    currency: 'INR',
    subtotal: '',
    taxAmount: '0',
    discountAmount: '',
    totalAmount: '',
    purchaseOrderNumber: '',
    paymentReference: '',
    description: '',
  })

  async function loadInvoices() {
    try {
      const response = await api.get('/api/v1/invoices', {
        params: { page: 0, size: 50, sort: 'createdAt,desc' },
      })
      setInvoices(response.data?.data?.content ?? [])
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Invoice list load nahi hui.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInvoices()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    const payload = {
      invoiceNumber: form.invoiceNumber.trim(),
      vendorId: form.vendorId.trim(),
      invoiceDate: form.invoiceDate,
      currency: form.currency,
      subtotal: form.subtotal,
      taxAmount: form.taxAmount,
      totalAmount: form.totalAmount,
    }

    if (form.dueDate) payload.dueDate = form.dueDate
    if (form.discountAmount !== '') payload.discountAmount = form.discountAmount
    if (form.purchaseOrderNumber.trim()) {
      payload.purchaseOrderNumber = form.purchaseOrderNumber.trim()
    }
    if (form.paymentReference.trim()) {
      payload.paymentReference = form.paymentReference.trim()
    }
    if (form.description.trim()) {
      payload.description = form.description.trim()
    }

    try {
      await api.post('/api/v1/invoices', payload)
      setSuccess('Invoice successfully create ho gaya.')
      setForm({
        invoiceNumber: '',
        vendorId: '',
        invoiceDate: '',
        dueDate: '',
        currency: 'INR',
        subtotal: '',
        taxAmount: '0',
        discountAmount: '',
        totalAmount: '',
        purchaseOrderNumber: '',
        paymentReference: '',
        description: '',
      })
      await loadInvoices()
      onCancel?.()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Invoice create nahi hua. Details check karke dobara try karo.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="space-y-6 p-5 sm:p-8">
      {showForm && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Create New Invoice
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Invoice details fill karke submit karo.
              </p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Invoice Number *
                </label>
                <input
                  name="invoiceNumber"
                  value={form.invoiceNumber}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="INV-2026-002"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Vendor ID (UUID) *
                </label>
                <input
                  name="vendorId"
                  value={form.vendorId}
                  onChange={handleChange}
                  required
                  placeholder="Paste existing vendor UUID"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Invoice Date *
                </label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={form.invoiceDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Currency *
                </label>
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
                >
                  {[
                    'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CNY',
                    'SGD', 'AED', 'CHF', 'ZAR', 'NZD', 'HKD', 'SEK',
                  ].map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Subtotal *
                </label>
                <input
                  type="number"
                  name="subtotal"
                  value={form.subtotal}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="19000"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Tax Amount *
                </label>
                <input
                  type="number"
                  name="taxAmount"
                  value={form.taxAmount}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Discount Amount
                </label>
                <input
                  type="number"
                  name="discountAmount"
                  value={form.discountAmount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Optional"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Total Amount *
                </label>
                <input
                  type="number"
                  name="totalAmount"
                  value={form.totalAmount}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="19000"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Purchase Order Number
                </label>
                <input
                  name="purchaseOrderNumber"
                  value={form.purchaseOrderNumber}
                  onChange={handleChange}
                  maxLength={100}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Payment Reference
                </label>
                <input
                  name="paymentReference"
                  value={form.paymentReference}
                  onChange={handleChange}
                  maxLength={100}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                maxLength={1000}
                rows={3}
                placeholder="Invoice ke baare mein short description"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
            {success && (
              <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Creating...' : 'Create Invoice'}
            </button>
          </form>
        </section>
      )}

      <InvoiceTable
        invoices={invoices}
        loading={loading}
        error={error && !showForm ? error : ''}
        title="All Invoices"
        subtitle="View and manage your invoices."
      />
    </main>
  )
}
function VendorsPage() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const emptyForm = {
    vendorCode: '',
    legalName: '',
    displayName: '',
    email: '',
    phone: '',
    address: '',
    country: 'IN',
    taxNumber: '',
    gstNumber: '',
  }

  const [form, setForm] = useState(emptyForm)

  async function loadVendors() {
    try {
      const response = await api.get('/api/v1/vendors', {
        params: { page: 0, size: 50, sort: 'createdAt,desc' },
      })
      setVendors(response.data?.data?.content ?? [])
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Vendor list load nahi hui.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVendors()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: name === 'country' ? value.toUpperCase().slice(0, 2) : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSaving(true)

    const payload = {}
    Object.entries(form).forEach(([key, value]) => {
      const trimmed = value.trim()
      if (trimmed) payload[key] = trimmed
    })

    try {
      await api.post('/api/v1/vendors', payload)
      setForm(emptyForm)
      setShowForm(false)
      await loadVendors()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Vendor create nahi hua. Details check karke dobara try karo.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="space-y-6 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Vendors</h3>
          <p className="mt-1 text-sm text-slate-500">
            Manage your vendor information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError('')
            setShowForm((current) => !current)
          }}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {showForm ? 'Close Form' : '+ Add Vendor'}
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {showForm && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 font-bold text-slate-900">Add New Vendor</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ['vendorCode', 'Vendor Code', 'e.g. VEND-001'],
                ['legalName', 'Legal Name *', 'Registered business name'],
                ['displayName', 'Display Name', 'Name shown in the app'],
                ['email', 'Email', 'vendor@example.com'],
                ['phone', 'Phone', 'Contact number'],
                ['country', 'Country Code *', 'IN'],
                ['taxNumber', 'Tax Number', 'Optional tax number'],
                ['gstNumber', 'GST Number', 'Optional GST number'],
              ].map(([name, label, placeholder]) => (
                <div key={name}>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {label}
                  </label>
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={name === 'legalName' || name === 'country'}
                    type={name === 'email' ? 'email' : 'text'}
                    maxLength={
                      name === 'legalName' || name === 'displayName'
                        ? 255
                        : name === 'vendorCode'
                          ? 50
                          : name === 'email'
                            ? 255
                            : name === 'phone'
                              ? 50
                              : name === 'country'
                                ? 2
                                : 50
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                  {name === 'country' && (
                    <p className="mt-1 text-xs text-slate-500">
                      Use 2-letter code, e.g. IN for India.
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                maxLength={500}
                rows={3}
                placeholder="Vendor's business address"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Vendor'}
            </button>
          </form>
        </section>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-bold text-slate-900">All Vendors</h3>
          <p className="mt-1 text-sm text-slate-500">
            Vendors saved in your workspace.
          </p>
        </div>

        {loading ? (
          <p className="p-5 text-sm text-slate-500">Loading vendors...</p>
        ) : vendors.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">No vendors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Vendor</th>
                  <th className="px-5 py-4">Vendor Code</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Country</th>
                  <th className="px-5 py-4">Verification</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {vendor.displayName || vendor.legalName}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {vendor.vendorCode || '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {vendor.email || '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {vendor.country || '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {vendor.verificationStatus || '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          vendor.active
                            ? 'bg-green-50 text-green-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {vendor.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
function RiskReviewsPage() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [analysingId, setAnalysingId] = useState(null)
  const [decisionId, setDecisionId] = useState(null)

  const loadInvoices = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await api.get('/api/v1/invoices', {
        params: { page: 0, size: 100, sort: 'createdAt,desc' },
      })
      const data = response.data?.data
      setInvoices(data?.content ?? [])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load invoices.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInvoices()
  }, [])

  const analyseInvoice = async (invoice) => {
  try {
    setAnalysingId(invoice.id)
    setError('')

    // DRAFT invoice ko pehle submit karna zaroori hai
    if (invoice.status === 'DRAFT') {
      await api.post(`/api/v1/invoices/${invoice.id}/submit`)
    }

    // Ab risk analysis run karo
    await api.post(`/api/v1/invoices/${invoice.id}/analyse`)
    await loadInvoices()
  } catch (err) {
    setError(err.response?.data?.message || 'Could not analyse invoice.')
  } finally {
    setAnalysingId(null)
  }
}

const decideInvoice = async (invoice, decision) => {
  try {
    setDecisionId(invoice.id)
    setError('')

    await api.post(`/api/v1/invoices/${invoice.id}/${decision}`, {})
    await loadInvoices()
  } catch (err) {
    setError(
      err.response?.data?.message ||
        `Could not ${decision} invoice.`
    )
  } finally {
    setDecisionId(null)
  }
}

  return (
    <main className="p-5 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Risk Reviews</h2>
        <p className="mt-2 text-sm text-slate-600">
          Review invoice risk levels and run risk analysis.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="font-semibold text-slate-900">Invoice Risk Reviews</h3>
          <p className="mt-1 text-sm text-slate-500">
            Invoices in your workspace and their latest risk results.
          </p>
        </div>

        {loading ? (
          <p className="p-5 text-sm text-slate-500">Loading invoices...</p>
        ) : invoices.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">No invoices found yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3">Invoice</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Risk Level</th>
                  <th className="px-5 py-3">Risk Score</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {invoice.invoiceDate || '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {invoice.currency} {invoice.totalAmount}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {invoice.riskLevel?.replaceAll('_', ' ') || 'Not assessed'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {invoice.latestRiskScore ?? '—'}
                    </td>
                    <td className="px-5 py-4">
  {invoice.status === 'REVIEW_REQUIRED' ? (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => decideInvoice(invoice, 'approve')}
        disabled={decisionId === invoice.id}
        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
      >
        {decisionId === invoice.id ? 'Saving...' : 'Approve'}
      </button>

      <button
        onClick={() => decideInvoice(invoice, 'reject')}
        disabled={decisionId === invoice.id}
        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
      >
        {decisionId === invoice.id ? 'Saving...' : 'Reject'}
      </button>
    </div>
  ) : (
    <button
      onClick={() => analyseInvoice(invoice)}
      disabled={
        analysingId === invoice.id ||
        !['DRAFT', 'SUBMITTED'].includes(invoice.status)
      }
      className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {analysingId === invoice.id
        ? 'Analysing...'
        : 'Run Analysis'}
    </button>
  )}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [summaryError, setSummaryError] = useState('')
  const [riskDistribution, setRiskDistribution] = useState({})
  const [invoices, setInvoices] = useState([])
  const [invoiceLoading, setInvoiceLoading] = useState(true)
  const [invoiceError, setInvoiceError] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get('/api/v1/analytics/summary', {
          params: {
            from: '2026-09-01',
            to: '2026-09-26',
          },
        })
        setSummary(response.data?.data ?? null)
      } catch (err) {
        setSummaryError(
          err.response?.data?.message || 'Dashboard data load nahi hua.'
        )
      }

      try {
        const response = await api.get(
          '/api/v1/analytics/risk-distribution',
          {
            params: {
              from: '2026-09-01',
              to: '2026-09-26',
            },
          }
        )
        setRiskDistribution(response.data?.data?.byRiskLevel ?? {})
      } catch (err) {
        // Summary and invoice list can still load if this endpoint fails.
        console.error('Risk distribution load nahi hua:', err)
      }

      try {
        const response = await api.get('/api/v1/invoices', {
          params: {
            page: 0,
            size: 5,
            sort: 'createdAt,desc',
          },
        })
        setInvoices(response.data?.data?.content ?? [])
      } catch (err) {
        setInvoiceError(
          err.response?.data?.message || 'Invoice list load nahi hui.'
        )
      } finally {
        setInvoiceLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const formatNumber = (value) =>
    Number(value ?? 0).toLocaleString('en-IN')

  const riskCount = (level) =>
    Number(riskDistribution?.[level] ?? 0)

  const totalScoredInvoices = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
    .reduce((total, level) => total + riskCount(level), 0)

  const riskItems = [
    { label: 'Low risk', level: 'LOW', color: 'bg-green-500' },
    { label: 'Medium risk', level: 'MEDIUM', color: 'bg-amber-500' },
    { label: 'High risk', level: 'HIGH', color: 'bg-red-500' },
    { label: 'Critical risk', level: 'CRITICAL', color: 'bg-purple-600' },
  ].map((item) => {
    const count = riskCount(item.level)
    const percentage =
      totalScoredInvoices > 0
        ? Math.round((count / totalScoredInvoices) * 100)
        : 0

    return { ...item, count, percentage }
  })

  const highRiskCount = riskCount('HIGH') + riskCount('CRITICAL')

  const dashboardStats = stats.map((stat) => {
    let value = 0

    if (stat.title === 'Total Invoices') {
      value = summary?.totalInvoices
    } else if (stat.title === 'Pending Review') {
      value = summary?.pendingApprovalCount
    } else if (stat.title === 'High Risk') {
      value = highRiskCount
    } else if (stat.title === 'Approved') {
      value = summary?.approvedInvoices
    }

    return { ...stat, value: formatNumber(value) }
  })

  return (
    <main className="space-y-6 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Welcome back, Manthan
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Here is your invoice activity overview.
          </p>
        </div>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          September 2026
        </span>
      </div>

      {summaryError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {summaryError}
        </p>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div>
            <h3 className="font-bold text-slate-900">Risk Overview</h3>
            <p className="mt-1 text-sm text-slate-500">
              Invoice distribution by risk level
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {riskItems.map((item) => (
              <div key={item.level}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {item.label}
                  </span>
                  <span className="text-slate-500">
                    {formatNumber(item.count)} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {totalScoredInvoices === 0 && (
            <p className="mt-4 text-xs text-slate-400">
              No risk-scored invoices are available for this period.
            </p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-900">Review Queue</h3>
          <p className="mt-1 text-sm text-slate-500">
            Invoices requiring attention
          </p>
          <div className="mt-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-50 p-2.5 text-red-600">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Rejected invoices
                </p>
                <p className="text-xs text-slate-500">
                  {formatNumber(summary?.rejectedInvoices)} rejected
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Awaiting review
                </p>
                <p className="text-xs text-slate-500">
                  {formatNumber(summary?.pendingApprovalCount)} pending decisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InvoiceTable
        invoices={invoices}
        loading={invoiceLoading}
        error={invoiceError}
      />
    </main>
  )
}

function SettingsPage() {
  const [organization, setOrganization] = useState(null)
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [ruleError, setRuleError] = useState('')
  const [savingRule, setSavingRule] = useState(null)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true)
        setError('')
        setRuleError('')

        const orgResponse = await api.get('/api/v1/organizations/me')
        setOrganization(orgResponse.data?.data ?? null)

        try {
          const rulesResponse = await api.get('/api/v1/risk-rules')
          setRules(rulesResponse.data?.data ?? [])
        } catch (err) {
          setRuleError(
            err.response?.data?.message ||
              'Could not load risk rules. You may not have permission to configure them.'
          )
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Could not load organization settings.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

const saveRule = async (rule) => {
  try {
    setSavingRule(rule.ruleCode)
    setRuleError('')
    setSaveMessage('')

    const response = await api.put(
      `/api/v1/risk-rules/${rule.ruleCode}`,
      {
        enabled: rule.enabled,
        weightPoints: rule.weightPoints ?? null,
      }
    )

    const updatedRule = response.data?.data
    if (updatedRule) {
      setRules((currentRules) =>
        currentRules.map((item) =>
          item.ruleCode === updatedRule.ruleCode ? updatedRule : item
        )
      )
    }

    setSaveMessage(`${rule.ruleCode.replaceAll('_', ' ')} saved.`)
  } catch (err) {
    setRuleError(
      err.response?.data?.message || 'Could not save this risk rule.'
    )
  } finally {
    setSavingRule(null)
  }
}

  if (loading) {
    return (
      <main className="p-5 sm:p-8">
        <p className="text-sm text-slate-500">Loading settings...</p>
      </main>
    )
  }

  return (
    <main className="p-5 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Settings</h2>
        <p className="mt-2 text-sm text-slate-600">
          View your workspace details and configure invoice risk rules.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-4 font-semibold text-slate-900">
          Organization Details
        </h3>

        {organization ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500">Organization Name</p>
              <p className="mt-1 font-medium text-slate-900">
                {organization.name || '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Workspace Slug</p>
              <p className="mt-1 font-medium text-slate-900">
                {organization.slug || '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Plan</p>
              <p className="mt-1 font-medium text-slate-900">
                {organization.plan || '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Status</p>
              <p className="mt-1 font-medium text-slate-900">
                {organization.status || '—'}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Organization details are not available.
          </p>
        )}
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="font-semibold text-slate-900">Risk Rules</h3>
          <p className="mt-1 text-sm text-slate-500">
            Review the risk rules configured for your organization.
          </p>
        </div>

        {ruleError && (
          <p className="m-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            {ruleError}
          </p>
        )}

        {saveMessage && (
  <p className="mx-5 mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
    {saveMessage}
  </p>
)}

        {!ruleError && rules.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">
            No risk rules found.
          </p>
        ) : (
          !ruleError && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Rule</th>
                    <th className="px-5 py-3">Enabled</th>
                    <th className="px-5 py-3">Weight Points</th>
                    <th className="px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
  {rules.map((rule) => (
    <tr key={rule.ruleCode}>
      <td className="px-5 py-4 font-medium text-slate-900">
        {rule.ruleCode?.replaceAll('_', ' ') || 'Risk rule'}
      </td>

      <td className="px-5 py-4">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={rule.enabled}
            onChange={(e) => {
              const enabled = e.target.checked
              setRules((currentRules) =>
                currentRules.map((item) =>
                  item.ruleCode === rule.ruleCode
                    ? { ...item, enabled }
                    : item
                )
              )
              setSaveMessage('')
            }}
            className="h-4 w-4 rounded border-slate-300 text-blue-600"
          />
          <span className="text-sm text-slate-700">
            {rule.enabled ? 'Enabled' : 'Disabled'}
          </span>
        </label>
      </td>

      <td className="px-5 py-4">
        <input
          type="number"
          min="0"
          value={rule.weightPoints ?? ''}
          placeholder="Default"
          onChange={(e) => {
            const value = e.target.value
            setRules((currentRules) =>
              currentRules.map((item) =>
                item.ruleCode === rule.ruleCode
                  ? {
                      ...item,
                      weightPoints: value === '' ? null : Number(value),
                    }
                  : item
              )
            )
            setSaveMessage('')
          }}
          className="w-28 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
        />
      </td>

      <td className="px-5 py-4">
        <button
          onClick={() => saveRule(rule)}
          disabled={savingRule === rule.ruleCode}
          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {savingRule === rule.ruleCode ? 'Saving...' : 'Save'}
        </button>
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          )
        )}
      </section>
    </main>
  )
}

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(sessionStorage.getItem('accessToken'))
  )
  const [activePage, setActivePage] = useState('Dashboard')
  const [showInvoiceForm, setShowInvoiceForm] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [organizationName, setOrganizationName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [verificationToken, setVerificationToken] = useState('')
  const [authMessage, setAuthMessage] = useState('')

  async function handleRegister(event) {
    event.preventDefault()
    setError('')
    setAuthMessage('')
    setLoading(true)

    try {
      await api.post('/api/v1/auth/register', {
        organizationName,
        email,
        password,
        firstName,
        lastName,
      })

      setAuthMessage(
        'Account created. Check your email in Mailpit for the verification token, then enter it below.'
      )
      setAuthMode('verify')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Registration failed. Please check the details and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyEmail(event) {
    event.preventDefault()
    setError('')
    setAuthMessage('')
    setLoading(true)

    try {
      await api.post('/api/v1/auth/email-verification/confirm', {
        token: verificationToken,
      })

      setAuthMessage('Email verified successfully. You can now sign in.')
      setAuthMode('login')
      setPassword('')
      setVerificationToken('')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Email verification failed. Check the token and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/api/v1/auth/login', {
        email,
        password,
      })

      const accessToken = response.data?.data?.accessToken

      if (!accessToken) {
        throw new Error('Login response mein access token nahi mila.')
      }

      sessionStorage.setItem('accessToken', accessToken)
      setIsLoggedIn(true)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Login nahi ho paya. Details check karke dobara try karo.'
      )
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('accessToken')
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
  }

    if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
        <div className="w-full max-w-md space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">InvoiceGuard</h1>
              <p className="text-sm text-slate-500">
                {authMode === 'login'
                  ? 'Sign in to your account'
                  : authMode === 'register'
                    ? 'Create your organisation account'
                    : 'Verify your email address'}
              </p>
            </div>
          </div>

          {authMessage && (
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {authMessage}
            </p>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogIn size={17} />
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              <p className="text-center text-sm text-slate-600">
                Don’t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register')
                    setError('')
                    setAuthMessage('')
                  }}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </form>
          )}

          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Organisation name
                </label>
                <input
                  required
                  maxLength={255}
                  value={organizationName}
                  onChange={(event) => setOrganizationName(event.target.value)}
                  placeholder="Your company name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    First name
                  </label>
                  <input
                    required
                    maxLength={100}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="First name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Last name
                  </label>
                  <input
                    required
                    maxLength={100}
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Last name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={12}
                  maxLength={128}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 12 characters"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Use 12+ characters with lowercase, uppercase and a number.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login')
                    setError('')
                    setAuthMessage('')
                  }}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}

          {authMode === 'verify' && (
            <form onSubmit={handleVerifyEmail} className="space-y-5">
              <p className="text-sm text-slate-600">
                Open Mailpit at{' '}
                <a
                  href="http://localhost:8025"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  localhost:8025
                </a>
                , open the verification email, and copy its token into the field below.
              </p>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Verification token
                </label>
                <textarea
                  required
                  rows={3}
                  value={verificationToken}
                  onChange={(event) => setVerificationToken(event.target.value.trim())}
                  placeholder="Paste verification token"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Verifying...' : 'Verify email'}
              </button>

              <p className="text-center text-sm text-slate-600">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login')
                    setError('')
                    setAuthMessage('')
                  }}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Back to sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    )
  }
    return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden lg:block">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex justify-end border-b border-slate-200 bg-white px-5 py-2 sm:px-8">
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-slate-600 hover:text-red-600"
          >
            Sign out
          </button>
        </div>

        <Header
          activePage={activePage}
          onNewInvoice={() => {
  setActivePage('Invoices')
  setShowInvoiceForm(true)
}}
        />

        {activePage === 'Dashboard' && <Dashboard />}

        {activePage === 'Invoices' && (
  <InvoicesPage
    showForm={showInvoiceForm}
    onCancel={() => setShowInvoiceForm(false)}
  />
)}

      {activePage === 'Vendors' && <VendorsPage />}
      {activePage === 'Risk Reviews' && <RiskReviewsPage />}

        {activePage === 'Settings' && <SettingsPage />}
      </div>
    </div>
  )
}