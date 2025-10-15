'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Users,
  Heart,
  Share2,
  Eye,
  ChevronLeft,
  Sparkles,
  Target,
  DollarSign,
  Grid,
  List,
  SlidersHorizontal,
} from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { value: 'all', label: 'جميع الفئات' },
    { value: 'tech', label: 'تقنية' },
    { value: 'education', label: 'تعليم' },
    { value: 'health', label: 'صحة' },
    { value: 'food', label: 'طعام' },
    { value: 'fashion', label: 'أزياء' },
    { value: 'art', label: 'فن' },
    { value: 'other', label: 'أخرى' },
  ];

  const statuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'active', label: 'نشط' },
    { value: 'funded', label: 'مكتمل' },
    { value: 'pending', label: 'معلق' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'الأحدث' },
    { value: 'popular', label: 'الأكثر شعبية' },
    { value: 'funded', label: 'الأكثر تمويلاً' },
    { value: 'ending', label: 'ينتهي قريباً' },
  ];

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, selectedStatus, sortBy]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: selectedCategory !== 'all' ? selectedCategory : '',
        status: selectedStatus !== 'all' ? selectedStatus : '',
        sort: sortBy,
      });
      
      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProjectCard = ({ project }: { project: any }) => {
    const progress = project.fundingGoal > 0 
      ? Math.min((project.currentFunding / project.fundingGoal) * 100, 100)
      : 0;

    return (
      <Link
        href={`/projects/${project.id}`}
        className="group card-hover"
      >
        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="badge badge-primary backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          {/* Status Badge */}
          {project.status === 'funded' && (
            <div className="absolute top-4 left-4">
              <span className="badge badge-success backdrop-blur-sm">
                مكتمل
              </span>
            </div>
          )}

          {/* Days Left */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white text-sm">
              <Clock className="w-4 h-4" />
              <span>{project.daysLeft || 0} يوم متبقي</span>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold text-gray-900">
                {(project.currentFunding || 0).toLocaleString()} ر.س
              </span>
              <span className="text-gray-600">
                من {(project.fundingGoal || 0).toLocaleString()} ر.س
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {progress.toFixed(0)}% مكتمل
            </div>
          </div>

          {/* Project Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{project.backers || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{project.views || 0}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // Handle like
                }}
                className="hover:text-red-500 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // Handle share
                }}
                className="hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                المشاريع
              </h1>
              <p className="text-gray-600">
                اكتشف المشاريع المبدعة وادعم الأفكار الواعدة
              </p>
            </div>
            <Link
              href="/projects/create"
              className="btn btn-primary hidden md:flex"
            >
              <Sparkles className="w-5 h-5" />
              <span>أنشئ مشروعك</span>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن مشروع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pr-12 w-full"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input py-2 px-4 w-auto"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input py-2 px-4 w-auto"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input py-2 px-4 w-auto"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="mr-auto flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container-custom py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredProjects.length} مشروع
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Target className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              لا توجد مشاريع
            </h3>
            <p className="text-gray-600 mb-6">
              جرب تغيير الفلاتر أو البحث
            </p>
            <Link href="/projects/create" className="btn btn-primary">
              <Sparkles className="w-5 h-5" />
              <span>أنشئ مشروعك الأول</span>
            </Link>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile FAB */}
      <Link
        href="/projects/create"
        className="md:hidden fixed bottom-24 left-4 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </Link>
    </div>
  );
}

