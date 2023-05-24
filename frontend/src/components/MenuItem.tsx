interface Props {
  title: string;
  icon: JSX.Element;
}
export function MenuItem({ icon, title }: Props) {
  return (
    <a
      href="#"
      className="group flex items-center rounded-lg p-2  text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    >
      <div className="text-gray-400 group-hover:text-blue-600">{icon}</div>
      <span className="ml-3">{title}</span>
    </a>
  );
}
