interface SearcherProps {
  onChange: (value: string) => void;
}

const Searcher = ({ onChange }: SearcherProps) => {
  return (
    <div className="flex justify-center items-center p-4">
      <input
        type="text"
        placeholder="Search for an artist..."
        className="border border-gray-400 rounded-lg p-2 w-full sm:w-64 md:w-80"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Searcher;
