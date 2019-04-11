<?php

namespace App;

/**
 * Class View
 * @package App
 */
class View
{
    use SetGet;

    /**
     * Отображает переданный шаблон
     * @param $template string
     */
    public function display($template)
    {
        echo $this->render($template);
    }

    /**
     * Возвращает переданный шаблон
     * @param $template string
     * @return string
     */
    public function render($template)
    {
        ob_start();
        include $template;
        $out = ob_get_contents();
        ob_end_clean();
        return $out;
    }

}
