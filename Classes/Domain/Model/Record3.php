<?php

namespace AutoDudes\Sitepackage\Domain\Model;

class Record3
{
    protected $title = '';

    public function __construct(string $title)
    {
        $this->title = $title;
    }

    public static function fromArray(array $array): Record3
    {
        return new self($array['title']);
    }

    public function getTitle(): string
    {
        return $this->title;
    }

}
