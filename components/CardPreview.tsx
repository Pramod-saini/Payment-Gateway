
interface Props {
  name: string;
  card: string;
  expiry: string;
}

export default function CardPreview({
  name,
  card,
  expiry,
}: Props) {
  return (
    <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <p className="tracking-widest text-xl">
        {card || '**** **** **** ****'}
      </p>

      <div className="flex justify-between mt-8">
        <div>
          <p className="text-xs opacity-70">
            CARD HOLDER
          </p>
          <p>{name || 'YOUR NAME'}</p>
        </div>

        <div>
          <p className="text-xs opacity-70">
            EXPIRES
          </p>
          <p>{expiry || 'MM/YY'}</p>
        </div>
      </div>
    </div>
  );
}
